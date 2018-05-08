<?php
require_once('./config/mysqlConnect.php');



$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

$entityBody = file_get_contents('php://input');
$request_data = json_decode($entityBody, true);

if(empty($request_data['id'])){
    die("no id given");
}


$fieldsToSanitize = ['part_name', 'description', 'brand', 'price_usd', 'part_number'];
$fields = [];

$params = [];

$subQuery = [];
forEach($fieldsToSanitize as $value){
    if(isset($request_data[$value])){
        $fields[$value] = $request_data[$value];
    }
}

forEach($fields as $key => $value){
    $subQuery[] = "$key = ?";
    $params[] = $value;
}
if(count($subQuery) < 1){
    $output['error'][] = "no fields to edit";
    die('no fields to edit');
}

$params[] = $request_data['id'];

$query =  "UPDATE `part` as p SET " . implode(" , ",$subQuery) . " WHERE p.id = ?";       
$letterString = str_repeat("s", (count($params) - 1)) . "i";
//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param($letterString, ...$params);
$stmt->execute();

if($stmt->affected_rows > 0){
    $output['data'][] = "part with id {$request_data['id']} successfully edited";
    $output['success'] = true;
}
else{
    preg_match_all('/(\S[^:]+): (\d+)/', $conn->info, $matches); 
    $infoArr = array_combine ($matches[1], $matches[2]);
    $output['error'][] = $infoArr;
}

$json_output = json_encode($output);
print($json_output);

?>