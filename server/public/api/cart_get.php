<?php 

require_once('functions.php');

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

$query = "SELECT `cartItems`.`price`, `cartItems`.`count`, `products`.`name`, `products`.`image`, `products`.`id` 
        FROM `cartItems`
        INNER JOIN `products` ON `cartItems`.`productID` = `products`.`id`";

// "SELECT `products`.`id`, `products`.`name`, `products`.`price`, `products`.`shortDescription`, 
//         `products`.`longDescription`, GROUP_CONCAT(`images`.`url`) AS image FROM `products` 
//         JOIN `images` ON `products`.`id` = `images`.`productID` WHERE `products`.`id` = `images`.`productID` 
//         GROUP BY `products`.`id`";

$result = mysqli_query($conn, $query);
$data = [];
while($row = mysqli_fetch_assoc($result)) {  // mysqli_fetch_assoc iterates through array until data runs out
    $data[] = $row;                             // then while tests a falsey value which stops the loop
}

if($data === []) { // if query id does not exist, result will not return anything. So this tests if the id is invalid
    print("[]");
}

if(count($data) === 1) {
    print(json_encode($data)); // index 0 because this returns an array with one object inside
} else {
    print(json_encode($data));
}
?>