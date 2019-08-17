<?php
require('model/UserManager.php');

$post = json_decode(file_get_contents('php://input'));

$login = $post[0];
$password = $post[1];
$email = $post[2];

$succes = UserManager::saveUser($login, $password, $email);

echo json_encode($succes);