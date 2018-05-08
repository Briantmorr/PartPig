<?php

 require_once('../config/mysqlConnect.php');
 
 $entityBody = file_get_contents('php://input');
 $request_data = json_decode($entityBody, true);
 
 $output = [
     'success'=> false,
     'error' => [],
     'data' => []
 ];
 if(!isset($request_data['first_name'], $request_data['last_name'], $request_data['middle_name'], $request_data['phone_number'])){
     die("fields required");
}
if(empty($request_data['userId'])){
    die('id required');
}
    $userId = $request_data['userId'];

$query =  "UPDATE `user`AS u SET first_name = ?, middle_name = ?, last_name = ?, phone_number = ? WHERE u.id = ?";       

//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param('sssss', $request_data['first_name'], $request_data['middle_name'],  $request_data['last_name'], $request_data['phone_number'], $userId);
$stmt->execute();


if($stmt->affected_rows > 0){
    $output['success'] = true;
    $output['data'][] = "name updated successfully";
} 
else{
    preg_match_all('/(\S[^:]+): (\d+)/', $conn->info, $matches); 
    $infoArr = array_combine ($matches[1], $matches[2]);
    $output['error'][] = $infoArr;
    $output['error'][] = "could not update name";
} 
$stmt->close();

$json_output = json_encode($output);
print($json_output);
?>
