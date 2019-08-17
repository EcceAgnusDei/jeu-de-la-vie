<?php

require('model/GridManager.php');
require('model/UserManager.php');

$id = json_decode(file_get_contents('php://input'));

$answer = [];


$request = GridManager::getGridById($id);
$userName = UserManager::getLoginById(
	GridManager::getAuthorIdById($id)
);

$data = $request->fetch();
$data['author'] = $userName;
$data['likes'] = GridManager::countLikes($id);

echo json_encode($data);