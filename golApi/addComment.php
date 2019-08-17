<?php
require('model/CommentManager.php');

$post = json_decode(file_get_contents('php://input'));

$gridId = $post[0];
$userId = $post[1];
$comment = $post[2];

$succes = CommentManager::addComment($gridId, $userId, $comment);

echo json_encode($succes);