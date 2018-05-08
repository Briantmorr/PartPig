<?php
require_once('../config/mysqlConnect.php');
//basic output format, all data gets pushed into data[]
$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

if(empty($_GET['user_id']) OR empty($_GET['addressType'])){
    die('need a user id and addressType');
}
if($_GET['addressType'] !== 'shipping' AND $_GET['addressType'] !== 'billing'){
    die("valid address type required");
}

$user_id = $_GET['user_id'];
$addressType = $_GET['addressType'];

$query =  "SELECT u.id AS user_id,
                  u.user_name, 
                  u.first_name,
                  u.middle_name, 
                  u.last_name, 
                  u.email,
                  u.phone_number,
                  a.company_name, 
                  a.street_address,
                  a.apt_suite,
                  a.city,
                  a.state,
                  a.state_abbr,
                  a.zipcode,
                  a.country
            FROM `user` AS u
            JOIN `address` AS a
                ON u.id = $user_id AND u." . $addressType . "_address_id = a.id
            ";

$result = mysqli_query($conn, $query);

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

$json_output = json_encode($output);
print($json_output);
?>