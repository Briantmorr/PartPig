<?php

$entityBody = file_get_contents('php://input');
$request_data = json_decode($entityBody, true);

$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

require("../config/mysqlConnect.php");
require_once('./addImagesToS3.php');




$fieldsToSanitize = ['part_name', 'description', 'category_id', 'part_condition', 'brand', 'make', 'model', 'year', 'seller_id', 'price_usd', 'part_number'];

$fields = [];
forEach($fieldsToSanitize as $value){
	 $fields[$value] = $request_data[$value];
}
$fields['description'] = $fields['description'] ?: 'There is no description for this part.';
$fields['part_condition'] = (int)$fields['part_condition'] ?: 1;
$fields['brand'] = $fields['brand'] ?: 'Other';
$fields['category_id'] = (int)$fields['category_id'] ?: 8;
$fields['year'] = (int)$fields['year'];
$fields['price_usd'] = (float)$fields['price_usd'];
$fields['seller_id'] = (int)$fields['seller_id'];
$fields['status'] = 'draft';

$query = "INSERT INTO `part` "; 
$tableValues =  [];
$tableFields = [];
$params = [];
$letterString = "";

forEach($fields as $key => $value){
	$tableFields[] = $key;
	$params[] = $value;
	$tableValues[] = "?";
	if(gettype($value) === 'integer'){
		$letterString .= "i";
	}
	else if(gettype($value) === 'double'){
		$letterString .= "d";
	}
	else{
		$letterString .= "s";
	}
}
$tableFields = "(" . implode(" , ", $tableFields) . ")";
$tableValues = "VALUES (" . implode(" , ", $tableValues) . ")";

$query .= $tableFields . $tableValues;
//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param($letterString, ...$params);
$stmt->execute();
$result = $stmt->get_result();


if($stmt->affected_rows === 1){
	$last_id = $conn->insert_id;
	$imgSubQuery = [];
	
	foreach($imageUrl as $image){
		$imgSubQuery[] = "(NULL, NULL, '$image', NULL, '$last_id')";
	}
	
	$imgQuery = "INSERT INTO `image` (`id`, `name`, `url`, `alt`, `part_id`) VALUES " . implode(" , ", $imgSubQuery);

	$imgResult = mysqli_query($conn, $imgQuery);
	
	$output['data'][] = "$last_id";
	$output['data'][] = "The Query was: ".$imgQuery ." result was" .$imgResult;
	if(!$imgResult){
		$output['error'] = mysqli_error($conn);
		die("image couldn't upload to image table");
	}
	
	$rows_affected = mysqli_affected_rows($conn);
	$output['data'][] = "New record created successfully. Total rows affected: ". $rows_affected ."." . " Last inserted ID is: ". $last_id . ".";
	$output['success'] = true;
}
else {
	$output['error'][] = "Error: " . mysqli_error($conn);
}

$json_output = json_encode($output);
print($json_output);

$stmt->close();
?>