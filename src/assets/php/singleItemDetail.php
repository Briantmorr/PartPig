<?php

header("Access-Control-Allow-Origin: *");
require_once('mysqlConnect.php');

$ID = $_GET['id'];
$imgQuery =  "SELECT url  FROM `image` WHERE part_id='$ID'";
$imgResult =  mysqli_query($conn, $imgQuery);

if($imgResult){
    if(mysqli_num_rows($imgResult)> 0){
        while($row = mysqli_fetch_assoc($imgResult)){
            // print_r($row);
           $images[] = $row['url'];
        }
    }
    else{
        $output['errors'][] = 'NO image available';
    }
    $output['success'] = true;
}
else{
    $output['errors'][] = 'Error in image database query';
}
// need to verify 'p.id AS category'
$query =  "SELECT
             p.id,
             p.brand AS brand,
             p.part_name AS title, 
             p.id AS category, 
             p.make, 
             p.model, 
             p.year, 
             p.part_number AS partNumber, 
             p.price_usd AS price, 
             p.description AS 'description', 
             p.part_condition AS 'condition', 
             a.city AS 'city', 
             a.state_abbr AS 'state', 
             p.seller_id AS 'seller_id',
             u.user_name AS 'seller' 
            FROM `part` AS p 
            JOIN `user` AS u
                ON  p.seller_id = u.billing_address_id
            JOIN `address` AS a
                ON u.billing_address_id = a.id
            WHERE p.id = $ID";

$result = mysqli_query($conn, $query);
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];
if($result){
    if(mysqli_num_rows($result)> 0){
        while($row = mysqli_fetch_assoc($result)){

            $row['images'] = $images;
            $row['price'] = (float)$row['price'];

            $output['data'][] = $row;
        }
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