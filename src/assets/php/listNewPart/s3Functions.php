<?php
//These functions are being required by addImagesToS3.php

function prepImageTypesAndExtForDecoding($imageURI){
    
    $valid = false;
    $validExtensions = ['png','jpeg', 'jpg'];
    foreach($validExtensions as $vExt){
        if(preg_match("/data:image\/$vExt/", $imageURI)){
            $imageURI = str_replace("data:image/$vExt;base64,", '', $imageURI);
            $GLOBALS['ext'] = $vExt;
            $valid = true;
            break;
           }
    }
    if(!$valid){
        die("invalid file type");
    }
    
    return $imageURI;
}

function saveAndUploadImageToAws($img, $filePath, $index){
    global $sdk;
    $previousFileName = "AWS_IMG_$index"."_";

    //compose the name with prev name and time ex: AWS_IMG_1_1523578198
    $fileName = $previousFileName . time();
    


    $img = prepImageTypesAndExtForDecoding($img);
    $data = base64_decode($img);
    $tempFilePath = UPLOAD_DIR.$fileName.$GLOBALS['ext'];
    $success = file_put_contents($tempFilePath,$data);
    
    if(!$success){
        die('unable to save file');
    }
    
    $s3Client = $sdk->createS3();
    try{
        $result =  $s3Client->putObject([
            'Bucket' => 'teampartpig',
            'Key'    => "$filePath/$fileName" ,
            'Body'   => fopen($tempFilePath, 'r'),
            'ACL'    => 'public-read',
            ]);
            
            // list files in bucket
            //  $result =  $s3Client->listObjects([
                //      'Bucket' => 'teampartpig'
                //  ]);
                //     print_r($result);
                
        }
        catch (Aws\S3\Exception\S3Exception $e) {
            die("There was an error uploading the file.");
        }
        
    //delete image from local storage
    require('./deleteFileFromTemp.php');
    return $result['ObjectURL'];
}


?>