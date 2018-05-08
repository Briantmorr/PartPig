<?php
require("../config/mailDetails.php");


$output = [
    'success'=> false,
    'error' => [],
    'data' => []
];

$entityBody = file_get_contents('php://input');
$request_data = json_decode($entityBody, true);

$receipt = false;
if(isset($request_data['receipt'])){
    unset($request_data['receipt']);
    $receipt = true;
}


$requiredFields = ['name', 'email', 'body', 'subject'];
foreach($request_data as $key => $value){
    if(in_array($key, $requiredFields)){
       $$key = $value;
    }
    else{
        die('required fields missing');
    }
}


require '../vendor/autoload.php';

$senderName = $name;
$destinationName = "Part Pig Feedback";
$senderEmail = $email;
$destinationEmail = $partPigEmail;

if($receipt){
    $senderName = "Part Pig";
    $destinationName = $name;
    $senderEmail = $partPigEmail;
    $destinationEmail = $email;
}


    $from = new SendGrid\Email("$senderName", "$senderEmail");
    $to = new SendGrid\Email("$destinationName", "$destinationEmail");

$content = new SendGrid\Content("text/html", "$body");
$mail = new SendGrid\Mail($from, $subject, $to, $content);
// getenv('SENDGRID_API_KEY');
$sg = new \SendGrid($apiKey);

$response = $sg->client->mail()->send()->post($mail);
$status = $response->statusCode();
if($status === 202){
    $output['success'] = true;
    $output['data'][] = "email sent to $destinationEmail";
}
else{
    $output['success'] = false;
    $output['error'][] = "status code: $status is incorrect";
    $output['error'][] = "email not sent";
    
}

$json_output = json_encode($output);
print($json_output);

// print_r($response->headers());
// echo $response->body();

