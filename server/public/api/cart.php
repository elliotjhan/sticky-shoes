<?php

define('INTERNAL', true);
require_once('functions.php');
session_start();
set_exception_handler('error_handler');
startup();
require_once('db_connection.php');


$method = $_SERVER['REQUEST_METHOD'];
//$item = file_get_contents('php://input');

if ($method == 'GET') {
  http_response_code(200);
  require_once('cart_get.php');
} else if ($method == 'POST') {
  http_response_code(201);
  require_once('cart_add.php');
  // print($item);
} else if ($method == 'PUT') {
  require_once('cart_update.php');
} else {
  http_response_code(404);
  print(json_encode([
    'error' => 'Not Found',
    'message' => "Cannot $method /api/cart.php"
  ]));
}

?>
