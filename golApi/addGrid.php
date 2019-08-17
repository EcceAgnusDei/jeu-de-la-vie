<?php
require('model/GridManager.php');

$post = json_decode(file_get_contents('php://input'));

$json = json_encode($post[0]);
$userId = $post[1];
$name = $post[2];

$succes = GridManager::save($json, $userId, $name);

echo json_encode($succes);