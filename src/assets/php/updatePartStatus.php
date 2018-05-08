<?php
require_once('./config/mysqlConnect.php');

//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

if(empty($_GET['id'])){
    die("no id given");

}
if(empty($_GET['status'])){
   die("no status given");
}

$id = $_GET['id'];  
$status = $_GET['status'];


$query = "UPDATE `part` SET `status` = ? WHERE `part`.`id` = ?"; 

$params = [$status, $id];
$letterString = "si";
//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param($letterString, $status, $id);
$stmt->execute();


if($stmt->affected_rows === 1){
    $output['success'] = true;
    $output['data'][] = "part $id status updated to $status";
}
else{
    preg_match_all('/(\S[^:]+): (\d+)/', $conn->info, $matches); 
    $infoArr = array_combine ($matches[1], $matches[2]);
    $output['error'][] = $infoArr;
}
$stmt->close();
$json_output = json_encode($output);
print($json_output);

?>