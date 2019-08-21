<?php
require('model/CommentManager.php');

$id = json_decode(file_get_contents('php://input'));

$succes = CommentManager::delete($id);

echo json_encode($succes);