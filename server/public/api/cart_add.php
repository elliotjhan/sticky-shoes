<?php
require_once('functions.php');



if(!INTERNAL) {
    print("Direct access not allowed");
    exit();
}

$item = file_get_contents('php://input');
$jsonBody = getBodyData($item);

if($jsonBody->id) {
    $id = $jsonBody->id;
    if(intval($id) < 1) {
        throw new Exception('id must be greater than 0');
    }
} 

if(empty($_SESSION['cartId'])) {
    $cartID = false;
} else {
    $cartID = $_SESSION['cartId'];
}

$query = "SELECT `products`.`price` FROM `products` WHERE `products`.`id` = {$id}";
$result = mysqli_query($conn, $query);
if(!$result) {
    throw new Exception('error with query: '. mysqli_error($conn)); // if $result is undefined, throw exception
}      

$productData = [];
while($row = mysqli_fetch_assoc($result)) {  // mysqli_fetch_assoc iterates through array until data runs out
    $productData[] = $row;    
    $price = $productData[0]['price'];  // associative array inside associative array in $price
}
if($productData === []) { // if query id does not exist, result will not return anything. So this tests if the id is invalid
    throw new Exception('Invalid ID:'. $id);
}
$query2 = 'START TRANSACTION';
$result2 = mysqli_query($conn, $query2);
if(!$result2) {
    throw new Exception('error with query 2: '. mysqli_error($conn)); // if $result is undefined, throw exception
}      

if($cartID === false) {
    $insertQuery = "INSERT INTO `cart` SET `cart`.`created` = NOW()";  
    $result3 = mysqli_query($conn, $insertQuery);
    if(!$result3) {
        throw new Exception('error with query 3: '. mysqli_error($conn)); // if $result is undefined, throw exception
    }
    if(mysqli_affected_rows($conn) !== 1) {
        throw new Exception('affected rows should only be 1');
    }
    $cartID = mysqli_insert_id($conn);
    $_SESSION['cartId'] = $cartID; 
} 

$cartItemQuery = "INSERT INTO `cartItems` SET `cartItems`.`count` = 1, `cartItems`.`productID` = {$id}, 
                `cartItems`.`price` = {$price}, `cartItems`.`added` = NOW(), `cartItems`.`cartID` = {$cartID} 
                ON DUPLICATE KEY UPDATE `cartItems`.`count` = `cartItems`.`count` + 1";

$result4 = mysqli_query($conn, $cartItemQuery);
if(!$result4) {
    throw new Exception('error with query 4: '. mysqli_error($conn)); // if $result is undefined, throw exception
}

if(mysqli_affected_rows($conn) < 1) {
    $rollback = 'ROLLBACK';
    mysqli_query($conn, $rollback);
    throw new Exceptioin('now normal');
} else {
    $commit = 'COMMIT';
    mysqli_query($conn, $commit);
}



?>