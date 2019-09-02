<?php
require('model/GridManager.php');

$id = json_decode(file_get_contents('php://input'));

$request = GridManager::getGridById($id);
$grid = $request->fetch();

if($grid['client_visibility'] == 0)
{
	GridManager::setClientVisible($id);
}
else
{
	GridManager::setClientUnvisible($id);
}