<?php
require_once('./config/mysqlConnect.php');
//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => [],
    'firstname' => []
];
if(empty($_GET['user_id'])){
    die('id required');
}
$user_id = $_GET['user_id'];
$nameQuery = "SELECT first_name FROM `user` WHERE id=?";

//prepared statement for query
$nameStmt = $conn->prepare($nameQuery);
$nameStmt->bind_param("i", $user_id);
$nameStmt->execute();
$nameResult = $nameStmt->get_result();
if($nameResult){
    $firstname = mysqli_fetch_assoc($nameResult)['first_name'];
}
if(empty($firstname)){
    die("no username for that id");
}   
$output['firstname'] = $firstname;   

$query =  "SELECT s.buyer_id,
                  p.id, 
                  p.brand, 
                  p.part_name, 
                  c.name AS category, 
                  p.make, 
                  p.model, 
                  p.year,                               
                  p.part_number, 
                  p.price_usd, 
                  i.url AS images
            FROM `shoppingcart` AS s
            JOIN `part` AS p
                ON s.buyer_id = ? AND s.part_id = p.id
            JOIN `category` AS c
                ON p.category_id = c.id 
            JOIN `image` AS i 
                ON i.id=
                (
                    SELECT MIN(im.id) 
                    FROM `image` as im 
                    WHERE im.part_id=p.id
                )";

//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();


$display = new stdClass();
$display->brand = 'true';
$display->price = 'true';

if($result){
    if(mysqli_num_rows($result)> 0){
        while($row = mysqli_fetch_assoc($result)){
            $row['images'] = array($row['images']); 
            $row['display'] = $display;
            $row['price_usd'] = (float)$row['price_usd'];
            $row['year'] = (int)$row['year'];
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

$json_output = json_encode($output);
print($json_output);
?>