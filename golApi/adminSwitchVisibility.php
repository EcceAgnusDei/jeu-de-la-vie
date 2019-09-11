<?php
require('model/GridManager.php');

$id = json_decode(file_get_contents('php://input'));

$request = GridManager::getGridById($id);
$grid = $request->fetch();

if($grid['visibility'] == 0)
{
	GridManager::setVisible($id);
}
else
{
	GridManager::setInvisible($id);
}