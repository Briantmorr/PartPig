<?php
require_once('./config/mysqlConnect.php');
//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

// default query we build off of
$query =  "SELECT p.id, 
                  p.brand, 
                  p.part_name, 
                  c.name AS category, 
                  p.make, 
                  p.model, 
                  p.year,                               
                  p.part_number, 
                  p.price_usd,
                  p.seller_id, 
                  i.url AS images
            FROM `part` AS p
            JOIN `category` AS c
                ON p.category_id = c.id 
            JOIN `image` AS i 
                ON i.id=
                (
                    SELECT MIN(im.id) 
                    FROM `image` as im 
                    WHERE im.part_id=p.id
                )
            WHERE ";

$fieldsToCheck = ['make', 'model', 'year'];  
$params = [];
$subQuery[] = "(p.status ='available' OR p.status='incart')";

if(!empty($_GET['keyword'])){
    $keyword = $_GET['keyword'];
    for($x = 0; $x < 6; $x++){
        $params[] = "%" . $_GET['keyword'] . "%";
    }
    $subQuery[] = "(`brand` LIKE ?
    OR `part_name` LIKE ?  
    OR `make` LIKE ? 
    OR `model` LIKE ?
    OR `description` LIKE ?
    OR `part_number` LIKE ?)";
}
if(isset($_GET['make']) || isset($_GET['model']) || isset($_GET['year'])){
    forEach($fieldsToCheck as $value){
        if(!empty($_GET[$value])){
            $subQuery[] = " $value = ?";
            $params[] = $_GET[$value];
        }
    }
}

$query .=  implode(" AND ",$subQuery);
$output['error'][] = $query;
$letterString = str_repeat("s", count($params));

//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param($letterString, ...$params);
$stmt->execute();
$result = $stmt->get_result();


    // display enables the front end filters
$display = new stdClass();
$display->brand = 'true';
$display->price_usd = 'true';
$display->category = 'true';
    
    if($result){
        if(mysqli_num_rows($result)> 0){
            while($row = mysqli_fetch_assoc($result)){
                $row['images'] = array($row['images']); 
                $row['display'] = $display;
                $row['price_usd'] = (float)$row['price_usd'];
            $row['year'] = (int)$row['year'];
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

$stmt->close();
$json_output = json_encode($output);
print($json_output);
?>