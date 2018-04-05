<?php
header("Access-Control-Allow-Origin: *");
require_once('mysqlConnect.php');
$_POST['part_number'] = 4;
$part_number = $_POST['part_number'];
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];
// default query
$query =  "SELECT *  FROM `image` WHERE part_id='$part_number'";   

if(isset($_POST['make']) && isset($_POST['model']) && isset($_POST['year'])){
    if(!empty($_POST['make']) && !empty($_POST['model'])&& !empty($_POST['year'])){
        $make = $_POST['make'];
        $model = $_POST['model'];
        $year = $_POST['year'];

        $query =  "SELECT p.id, p.brand, p.part_name AS title, p.id AS category, p.make, p.model, p.year, p.part_number AS partNumber, p.price_usd AS price, p.image AS images  FROM `part` AS p  WHERE `make`='$make' AND `model`='$model' AND `year`='$year'";
    }
    else{
        $output['error'][] = 'Make or Model or Year empty';
    }
}
else{
    $output['error'][] = 'Make or Model or Year unset';
}

        
$result = mysqli_query($conn, $query);
$images = [];
if($result){
    if(mysqli_num_rows($result)> 0){
        while($row = mysqli_fetch_assoc($result)){
           $images[] = $row;
        }
        $output['data'][] = $images;
    }
    else{
        $output['errors'][] = 'NO Data available';
    }
    $output['success'] = true;
}
else{
    $output['errors'][] = 'Error in database query';
}

$json_output = json_encode($output);
print($json_output);
 ?>