<?php

require('model/GridManager.php');

$grids=[];
$request = GridManager::getGridsByDate();
while($data = $request->fetch())
{	
	$likes = GridManager::countLikes($data['id']);

	$gridsItem = [];
	$gridsItem['id'] = $data['id'];
	$gridsItem['likes'] = $likes;
	array_push($grids, $gridsItem);
}

echo json_encode($grids);