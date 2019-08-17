<?php
require('model/LikeManager.php');

$post = json_decode(file_get_contents('php://input'));
$commentId = $post[0];
$userId = $post[1];

$state = LikeManager::getLikeState($commentId, $userId, 'comment');

if($state != 'disliked')
{
	$succes = LikeManager::commentDislike($commentId, $userId);
}
else
{
	$succes = LikeManager::deleteCommentDislike($commentId, $userId);
}

echo json_encode($succes);