<?php
require('model/GridManager.php');
require('model/LikeManager.php');

$id = json_decode(file_get_contents('php://input'));

$response = [];

$response['likes'] = GridManager::countLikes($id);
$response['likers'] = LikeManager::getGridLikers($id);

echo json_encode($response);