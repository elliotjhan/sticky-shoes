<?php

require_once('functions.php');

if(!INTERNAL) {
    print("Direct access not allowed");
    exit();
}

$item = file_get_contents('php://input');
$jsonBody = getBodyData($item);

if(!empty($jsonBody->id)) {
    $id = $jsonBody->id;
    if(intval($id) < 1) {
        throw new Exception('id must be greater than 0');
    }
    if(gettype($id) !== "integer") {
        throw new Exception('id must be a number');
    }
    $query = "DELETE from `cartItems` WHERE `cartItems`.`productID` = {$id}";
} else if($jsonBody->cartId) {
    $cartId = $jsonBody->cartId;
    if(intval($cartId) < 1) {
        throw new Exception('id must be greater than 0');
    }
    if(gettype($cartId) !== "integer") {
        throw new Exception('id must be a number');
    }
    $query = "DELETE from `cartItems` WHERE `cartItems`.`cartID` = {$cartId}";
} else {
    throw new Exception('id required to add to cart');
} 

if(empty($_SESSION['cartId'])) {
    print_r(getBodyData([]));
    exit();
} else {
    $cartId = intval($_SESSION['cartId']);
}

$result = mysqli_query($conn, $query);
if(!$result) {
    throw new Exception('error with query: '. mysqli_error($conn)); // if $result is undefined, throw exception
}     






?>