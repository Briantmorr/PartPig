<?php
require_once('./config/mysqlConnect.php');

if(empty($_GET['seller_id'])){
    die("seller id required");
}

//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

$query =  "SELECT p.id, 
                  p.brand,
                  p.status, 
                  p.seller_id As seller,
                  p.part_name, 
                  c.name AS category, 
                  p.make, 
                  p.model, 
                  p.year,                               
                  p.part_number, 
                  p.price_usd, 
                  i.url AS images
            FROM `part` AS p
            JOIN `category` AS c
                ON p.category_id = c.id 
            JOIN `image` AS i 
                ON i.id= (
                    SELECT MIN(im.id) 
                    FROM `image` as im 
                    WHERE im.part_id=p.id
                ) 
                AND p.seller_id = ?";   

//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $_GET['seller_id']);
$stmt->execute();
$result = $stmt->get_result();





if($result){
    if(mysqli_num_rows($result)> 0){
        while($row = mysqli_fetch_assoc($result)){
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