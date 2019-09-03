<?php

function error_handler($error, $code=500) { // 200's is all good, 404 server not found, 
    http_response_code($code); // 500 is default code if there is no argument passed in the $code parameter, 500 is server error
    $output = [
        'success'=> false, // associative array 
        'error'=> $error->getMessage()   // -> getMessage() method of $error object
    ];
    $json_output = json_encode($output);
    print($json_output);
}

function startup() {
    header("Content-type:application/json");
}

function getBodyData($json) {
    $phpObj = json_decode($json);
    // print_r($phpObj);
    return $phpObj;
}

?>

