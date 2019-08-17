<?php

require('model/UserManager.php');

$post = json_decode(file_get_contents('php://input'));

$login = $post[0];
$password = $post[1];

$userId = UserManager::userIdentifying($login, $password);

echo json_encode($userId);