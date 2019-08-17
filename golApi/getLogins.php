<?php
require_once('model/UserManager.php');


$request = UserManager::getUsers();

$userLogins = [];

while ($data = $request->fetch())
{
	array_push($userLogins, $data['login']);
}

echo json_encode($userLogins);