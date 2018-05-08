<?php
require_once('./config/mysqlConnect.php');

if(empty($_GET['id'])){
    die("id required");
}


$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];


$imgQuery =  "SELECT url  FROM `image` WHERE part_id= ?";

//prepared statement for image query
$stmt = $conn->prepare($imgQuery);
$stmt->bind_param("s", $_GET['id']);
$stmt->execute();
$imgResult = $stmt->get_result();




if($imgResult){
    if(mysqli_num_rows($imgResult)> 0){
        while($row = mysqli_fetch_assoc($imgResult)){
           $images[] = $row['url'];
        }
        $output['success'] = true;
    }
    else{
        $output['errors'][] = 'NO image available';
    }
   
}
else{
    $output['errors'][] = 'Error in image database query';
}

$query =  "SELECT
             p.id,
             p.brand,
             p.part_name, 
             c.name AS category, 
             p.make, 
             p.model, 
             p.year, 
             p.part_number, 
             p.price_usd, 
             p.description, 
             co.part_condition, 
             a.city AS 'city', 
             a.state_abbr AS 'state', 
             p.seller_id AS 'seller_id',
             u.user_name AS 'seller' 
            FROM `part` AS p
            JOIN `condition` AS co
                ON p.part_condition = co.id
            JOIN `category` AS c
                ON p.category_id = c.id 
            JOIN `user` AS u
                ON  p.seller_id = u.id
            JOIN `address` AS a
                ON u.billing_address_id = a.id
            WHERE p.id = ?";


//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $_GET['id']);
$stmt->execute();
$result = $stmt->get_result();


if($result){
    if(mysqli_num_rows($result)> 0){
        while($row = mysqli_fetch_assoc($result)){

            $row['images'] = $images;
            $row['price_usd'] = (float)$row['price_usd'];

            $output['data'][] = $row;
        }
        $output['success'] = true;
    }
    else{
        $output['errors'][] = 'NO Data available';
    }
   
}
else{
    $output['errors'][] = 'Error in database query';
}
$stmt->close();

$json_output = json_encode($output);
print($json_output);

?>