<?php
require_once('functions.php');

if(!'INTERNAL') {
    print("Direct access not allowed");
    exit();
}

$id = getBodyData($json);

if(intval($id) < 1) {
    throw new Exception('id must be greater than 0');
}

if($_SESSION['cartId']) {
    $cartID = $_SESSION['cartId'];
} {
    $cartID = false;
}

$query = "SELECT `products`.`price` WHERE `products`.`id` = {$id}";

$result = mysqli_query($conn, $query);

if(!$result) {
    throw new Exception('error with query: '. mysqli_error($conn)); // if $result is undefined, throw exception
}      

$data = [];
while($row = mysqli_fetch_assoc($result)) {  // mysqli_fetch_assoc iterates through array until data runs out
    $data[] = $row;                             // then while tests a falsey value which stops the loop
}
if($data === []) { // if query id does not exist, result will not return anything. So this tests if the id is invalid
    throw new Exception('Invalid ID:'. $id);
}





?>