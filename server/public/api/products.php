<?php
                                // the require statement takes all text/code/markup that is in a file and copies it here
require_once('functions.php'); // require will produce a fatal error upon failure
                                // require_once will check if the file has already been copied, if it has, will not 
                                // include will only produce a warning and will allow script to run

set_exception_handler('error_handler'); // sets a user-defined exception handler function
                                        // required. runs function when uncaught exception occurs

startup(); // function from our functions.php that implements header('content-type:application/json)

if(empty($_GET['id'])) { // $_GET is an array of variable names/values sent by http GET method
    $query = "SELECT `products`.`id`, `products`.`name`, `products`.`price`, `products`.`shortDescription`, 
        `products`.`longDescription`, GROUP_CONCAT(`images`.`url`) AS image FROM `products` 
        JOIN `images` ON `products`.`id` = `images`.`productID` WHERE `products`.`id` = `images`.`productID` 
        GROUP BY `products`.`id`";
} else {
    $id = $_GET['id'];
    if(!is_numeric($id)) {  // is_numeric, php method to check if the argument is a number
        throw new Exception('id needs to be a number'); // when Exception occurs, following code will not execute.
                                                        // php will try to find catch block, if none then fatal error will occur
    }  
    $query = "SELECT * FROM `products` WHERE id = {$id}";
    // $query = "SELECT `products`.`id`, `products`.`name`, `products`.`price`, `products`.`shortDescription`, 
    //     `products`.`longDescription`, GROUP_CONCAT(`images`.`url`) AS image FROM `products` 
    //     JOIN `images` ON `products`.`id` = `images`.`productID` WHERE `products`.`id` = `images`.`productID` 
    //     GROUP BY `products`.`id`";                                                 
    // $whereClause = " WHERE id = {$id}";
}

require_once('db_connection.php'); // our php file with servername, username, password, and port

//$query = "SELECT * FROM products " . $whereClause;  // concatenate our whereClause to phpmyadmin query depending if id exists or not

$result = mysqli_query($conn, $query); // performs the query against the database. 2 parameters of connection and query
                                        // returns a mysqli_result object, here we assign that to variable $result
if(!$result) {
    throw new Exception('error with query: '. mysqli_error($conn)); // if $result is undefined, throw exception
}                                                                   // returns last error description for most recent function call

$data = [];
while($row = mysqli_fetch_assoc($result)) {  // mysqli_fetch_assoc iterates through array until data runs out
    $row['image'] = explode(",", $row['image']); // replaces current value of row[image] which is a long string with the exploded version which splits it into an array
    $data[] = $row;                             // then while tests a falsey value which stops the loop
}

if($data === []) { // if query id does not exist, result will not return anything. So this tests if the id is invalid
    throw new Exception('Invalid ID:'. $id);
}

if(count($data) === 1) {
    print(json_encode($data[0])); // index 0 because this returns an array with one object inside
} else {
    print( json_encode($data));
}





// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }

// doStuff()
// $output = file_get_contents('dummy-products-list.json');
// print($output);

?>



