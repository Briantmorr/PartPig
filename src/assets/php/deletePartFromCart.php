<?php
require_once('./config/mysqlConnect.php');
//basic output format, all data gets pushed into data[]

$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

if(empty($_GET['user_id']) OR empty($_GET['part_id'])){
    die("user id and part id required");
}

$buyer_id = (int)$_GET['user_id'];
$part_id = (int)$_GET['part_id'];

// $query = "DELETE FROM `order_meta`
//            WHERE `order_meta`.`buyer_id` = '$buyer_id'";


$query = "DELETE FROM `shoppingcart`
           WHERE `shoppingcart`.`buyer_id` = ?
           AND `shoppingcart`.`part_id` = ?;

           ";


//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $buyer_id, $part_id);
$stmt->execute();
$result = $stmt->get_result();
print_r($result);

if($stmt->affected_rows > 0){
    $output['success'] = true;
    $output['data'][] = "Successfully removed records from table shoppingcart. Total rows affected: {$stmt->affected_rows}";

} else {
    preg_match_all('/(\S[^:]+): (\d+)/', $conn->info, $matches); 
    $infoArr = array_combine ($matches[1], $matches[2]);
    $output['error'][] = $infoArr;
    $output['error'][] = "error with deletion";
}
$stmt->close();

$json_output = json_encode($output);
print($json_output);

?>