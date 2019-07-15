<?php

function error_handler($error) {
    $output = [
        'success'=> false,
        'error'=> getMessage()   
    ];
    $json_output = $error->json_encode($output);
    print($json_output);
}

?>

