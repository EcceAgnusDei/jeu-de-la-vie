<?php
require('model/LikeManager.php');

$post = json_decode(file_get_contents('php://input'));
$commentId = $post[0];
$userId = $post[1];

$state = LikeManager::getLikeState($commentId, $userId, 'comment');

if($state == 'liked')
{
	$succes = LikeManager::deleteCommentLike($commentId, $userId);
}
else
{
	if($state == 'disliked')
	{
		LikeManager::deleteCommentDislike($commentId, $userId);
	}
	$succes = LikeManager::commentLike($commentId, $userId);
}

echo json_encode($succes);