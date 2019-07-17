<?php

function error_handler($error) { 
    http_response_code(500);
    $output = [
        'success'=> false,
        'error'=> $error->getMessage()   
    ];
    $json_output = json_encode($output);
    print($json_output);
}

function startup() {
    header("Content-type:application/json");
}

?>

