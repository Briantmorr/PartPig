<?php
//this file is being required by multipleStatusUpdates.php
$uniqid = uniqid();
$orderQuery = "INSERT INTO `order_details` (`order_tracker`, `buyer_id`, `seller_id`, `part_id`, `cost`, `status`) 
               SELECT '$uniqid', ?, p.seller_id, p.id, p.price_usd,  'Transaction complete' 
               FROM `part` AS p
               WHERE p.id
               IN (" . implode(" , ", $id) . ")";


//prepared statement for query
$orderStmt = $conn->prepare($orderQuery);
$orderStmt->bind_param("i", $buyer_id);
$orderStmt->execute();
$orderResult = $orderStmt->get_result();


if($orderStmt->affected_rows){
    $output['data'][] = "transaction processed for " . implode(" , ", $id);
    $output['data']['order_number'] = $uniqid;
    $output['success'] = true;
}
else{
    die('could not process transaction');
}

$cartQuery = "DELETE FROM `shoppingcart` WHERE buyer_id=?";

//prepared statement for query
$cartStmt = $conn->prepare($cartQuery);
$cartStmt->bind_param("i", $buyer_id);
$cartStmt->execute();


if($cartStmt->affected_rows){
    $output['data'][] = "affected rows = {$cartStmt->affected_rows}";
    $output['data'][] = "cart updated for buyer with id of " . $buyer_id;
    $output['success'] = true;
}
else{
    die('could not update cart');
}
?>