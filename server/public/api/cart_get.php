<?php 


if(!INTERNAL) {
    print("Direct access not allowed");
    exit();
}

if(empty($_SESSION['cartId'])) {
    print_r(getBodyData([]));
    exit();
} else {
    $cartId = intval($_SESSION['cartId']);
}

$query = "SELECT ";


?>