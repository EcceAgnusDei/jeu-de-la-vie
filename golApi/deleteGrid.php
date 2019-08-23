<?php

require('model/GridManager.php');

$id = file_get_contents('php://input');

$succes = GridManager::delete($id);

echo json_encode($succes);

