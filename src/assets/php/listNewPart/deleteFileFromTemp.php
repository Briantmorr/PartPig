<?php
//this file is being required by s3Functions to close the file reader
if(is_file($tempFilePath)){
    gc_collect_cycles();
    unlink($tempFilePath);
}

?>