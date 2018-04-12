<?php
header("Access-Control-Allow-Origin: *");
require_once('mysqlConnect.php');
//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

$_GET['id'] = 2;
$_GET['buyer_id'] =2;

if(!isset($_GET['id'])){
    $output['error'][] = 'Error: user id not specified';
}
else{
    $part_id = $_GET['id'];  
}

$status = 'incart';

$query1 = "UPDATE `part` 
           SET `status` = '$status' 
           WHERE `part`.`id` = $part_id"; 

$result1 = mysqli_query($conn, $query1);
if($result1){
    $output['success'] = true;
    $output['data'][] = "part '$part_id' status updated to $status";
}
else{
    $output['error'][] = 'Error in database query, probably problem with enum letters';
}

$json_output = json_encode($output);
print($json_output);

$buyer_id = $_GET['buyer_id'];
$count = 2;
$price = 55;
$order_status = 'Order received';
$shipping_charge = 9.99;

$query2 = "INSERT INTO `order_meta`
           (buyer_id, count, price, tax, status, shipping_charge)
           Values (
             '$buyer_id', '$count', '$price', ('$count'*'$price'*0.075), '$order_status', '$shipping_charge'
           )";

$result2 = mysqli_query($conn, $query2);
$rows_affected = mysqli_affected_rows($conn);
if($result2){
    $last_id = mysqli_insert_id($conn);
    echo "New record created successfully in order_meta. Total rows affected: ", $rows_affected ."." . " Last inserted ID is: ". $last_id . ".";
} else {
    echo "Error: " . mysqli_error($conn);
}
mysqli_close($conn);
?>