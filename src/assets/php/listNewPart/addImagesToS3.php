<?php
require('../vendor/autoload.php');
require('../config/awsConnect.php');
require('./s3Functions.php');

//This file is being required by processSellpartForm.php


$sdk = new Aws\Sdk($sharedConfig);

if(empty($request_data['seller'])){
    $request_data['seller'] = 'anonymous';
}
if(empty($request_data['images'][0])){
    die('please upload an image');
}

$GLOBALS['ext'] = '';
$day = date('Y-m-d');
$username = $request_data['seller'];

// compose the file directory path ex: images/2018-4-12/user1/
$filePath = "images/$day/$username";
    


define('UPLOAD_DIR', './tempUploads/');
$imageUrl = [];
$index = 0;

foreach($request_data['images'] as $singleImage){
    $image = $singleImage['imagePreviewUrl'];
    $imageUrl[] = saveAndUploadImageToAws($image, $filePath, $index);
    $index++;
}

?>