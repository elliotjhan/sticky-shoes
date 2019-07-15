<?php

header('Content-Type: application/json');
require_once('db_connection.php');
if (empty($_GET['id'])) {
  readfile('dummy-products-list.json');
} else {
  readfile('dummy-product-details.json');
}

?>
