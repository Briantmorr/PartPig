<?php
require_once('../config/mysqlConnect.php');

//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

$entityBody = file_get_contents('php://input');
$request_data = json_decode($entityBody, true);

if(empty($request_data['user_id']) OR empty($request_data['shipping']) OR empty($request_data['billing'])){
    die('send a user_id, shipping and billing address');
}
$user_id = $request_data['user_id'];
//this lets us check remaining fields in request data as address fields
unset($request_data['user_id']);

$shipping = $request_data['shipping'];
$billing = $request_data['billing'];
$addressFieldsToCheck = ['company_name', 'street_address', 'apt_suite', 'city', 'state', 'state_abbr', 'zipcode'];
foreach($request_data as $key => $val){
    $subquery = [];
    $params = [];
    foreach($val as $item => $itemValue){
        if(in_array($item, $addressFieldsToCheck)){
            $subquery[] = "`address`.$item = ?";
            $params[] = $itemValue;
        }
    }
    $query = "UPDATE `address`
        SET " . implode(' , ', $subquery) . "
        WHERE `address`.`id` =(
        SELECT u." . $key ."_address_id
        FROM `user` AS u
        WHERE u.id = ?
        )";

    $params[] = $user_id;
    $letterString = str_repeat("s", (count($params) -1)) . "i";
   
    //prepared statement for query
    $stmt = $conn->prepare($query);
    $stmt->bind_param($letterString, ...$params);
    $stmt->execute();

    if($stmt->affected_rows){
        $output['success'] = true;
        $output['data'][] = "1 address table updated for $user_id";
    }
    else{
        preg_match_all('/(\S[^:]+): (\d+)/', $conn->info, $matches); 
        $infoArr = array_combine ($matches[1], $matches[2]);
        $output['error'][] = $infoArr;
        $output['error'][] = 'If rows matched === 1, row is already updated';
        $output['success'] = false;
    }
    unset($subquery);
}

$json_output = json_encode($output);
print($json_output);
?>