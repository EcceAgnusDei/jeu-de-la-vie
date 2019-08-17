<?php
require('model/GridManager.php');

$userId = json_decode(file_get_contents('php://input'));

$grids=[];
$request = GridManager::getGridsByAuthorId($userId);
while($data = $request->fetch())
{	
	$likes = GridManager::countLikes($data['id']);

	$gridsItem = [];
	$gridsItem['id'] = $data['id'];
	$gridsItem['likes'] = $likes;
	array_push($grids, $gridsItem);
}

echo json_encode($grids);