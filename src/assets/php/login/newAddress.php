<?php
require_once('../config/mysqlConnect.php');

//this endpoint is ready for the front end to call and add a new address for a registered user.


//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

$entityBody = file_get_contents('php://input');
$request_data = json_decode($entityBody, true);

if(!isset($request_data['userId'])){
    die('user id required');
}
$userId = $request_data['userId'];



$addressFields = ['street_address', 'apt_suite', 'city', 'state_abbr', 'state', 'zipcode'];

$query = "INSERT INTO `address` (" . implode(' , ', $addressFields) . ")
        VALUES (?, ?, ?, ?, ?, ?)";
      


$stmt = $conn->prepare($query);
$stmt->bind_param('ssssss', $request_data['street_address'], $request_data['apt_suite'],  $request_data['city'], $request_data['state_abbr'], $request_data['state'], $request_data['zipcode']);
$stmt->execute();


    if($stmt->affected_rows > 0){
        $output['data'][] = "1 address table updated for $userId";
        $addressId = $conn->insert_id;
        }
    else{
        $output['success'] = false;
        $output['error'][] = 'Error in inserting address';
        die("error in inserting address");
    }

    $userQuery = "UPDATE `user` SET billing_address_id = $addressId, shipping_address_id = $addressId WHERE `user`.id = ?";
   
    $userStmt = $conn->prepare($userQuery);
    $userStmt->bind_param('s', $userId);
    $userStmt->execute();
   
        if($userStmt->affected_rows > 0){
            $output['success'] = true;
            $output['data'][] = "Updated user $userId info with address table at $addressId";
        }
        else{
            $output['success'] = false;
            $output['error'][] = 'error in updating user table';
        }

$json_output = json_encode($output);
print($json_output);
?>