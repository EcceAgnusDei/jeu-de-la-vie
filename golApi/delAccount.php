<?php
require('model/UserManager.php');

$id = json_decode(file_get_contents('php://input'));


$succes = UserManager::delete($id);

echo json_encode($succes);