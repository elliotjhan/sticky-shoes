<?php
require_once('functions.php');

if(!INTERNAL) {
    print("Direct access not allowed");
    exit();
}

$id = getBodyData();




?>