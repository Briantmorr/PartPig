<?php

 require_once('../config/mysqlConnect.php');
 
 $entityBody = file_get_contents('php://input');
 $request_data = json_decode($entityBody, true);
 
 $output = [
     'success'=> false,
     'error' => [],
     'data' => []
 ];


if(empty($request_data['user']) OR empty($request_data['password'])){
    die("username and password required");
}
    
$user = $request_data['user'];
$password = sha1($request_data['password']);
    
$query = "SELECT * FROM `user` WHERE user_name=? AND password=?";
    

//prepared statement for query
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $user, $password);
$stmt->execute();
$result = $stmt->get_result();

    if($stmt->affected_rows ===1){
        $output['success'] =true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    }
    else{
        $output['error'][] = "INVALID LOGIN";
    }
$stmt->close();

unset($output['data'][0]['password']);
unset($password);
$json_output = json_encode($output);
print($json_output);
?>
