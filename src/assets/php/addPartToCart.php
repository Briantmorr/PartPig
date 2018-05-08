<?php
require_once('./config/mysqlConnect.php');
//basic output format, all data gets pushed into data[]

$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];


if(empty($_GET['part_id']) OR empty($_GET['user_id'])){
    die("part id and user id required");
}

$buyer_id = (int)$_GET['user_id'];
$part_id = (int)$_GET['part_id'];

$count = 1;

$order_status = 'Order received';
$shipping_charge = 9.99;

$params = [$buyer_id, $part_id, $count, $order_status, $shipping_charge];

$query = "INSERT INTO `shoppingcart`
           (buyer_id, part_id, count, status, shipping_charge)
           Values (?, ?, ?, ?, ?)";

//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param("iiisi", ...$params);
$stmt->execute();


$rows_affected = $stmt->affected_rows;

if($rows_affected > 0){
    $last_id = $conn->insert_id;
    $output['success'] = true;
    $output['data'][] = "New record created successfully in shoppingcart. Total rows affected: ". $rows_affected ."." . " Last inserted ID is: ". $last_id . ".";
} else {
    $output['error'][] = "error adding part to cart";
}
$stmt->close();

$json_output = json_encode($output);
print($json_output);
?>