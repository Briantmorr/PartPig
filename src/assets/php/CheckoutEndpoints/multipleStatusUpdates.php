<?php
require_once('../config/mysqlConnect.php');

//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];


if(empty($_GET['id']) OR empty($_GET['status'])){
    die('id and status required');
}

$id = json_decode($_GET['id'], TRUE);
$status = $_GET['status'];

if(count($id) === 0){
    die('no parts to change');
}

if($status === 'sold'){
    if(empty($_GET['buyer_id'])){
        die("buyer_id required");
    }
    $buyer_id = $_GET['buyer_id'];
    require('handleOrderAndCart.php');
}

$subQuery = [];
forEach($id as $temp){
    $subQuery[] = "?";
}

$query = "UPDATE `part` SET `status` = ? WHERE `id` IN (" .  implode(" , ", $subQuery) . ")"; 

$letterString = "s" . str_repeat("i", count($id));

//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param($letterString, $status, ...$id);
$stmt->execute();
$result = $stmt->get_result();


if($stmt->affected_rows > 0){
    $output['success'] = true;
    $output['data'][] = "part" . implode(" , ",$id). "status's updated to $status";
}
else{
    preg_match_all('/(\S[^:]+): (\d+)/', $conn->info, $matches); 
    $infoArr = array_combine ($matches[1], $matches[2]);
    $output['error'][] = $infoArr;
    $output['error'][] = 'Error in database query';
}
$stmt->close();

$json_output = json_encode($output);
print($json_output);

?>