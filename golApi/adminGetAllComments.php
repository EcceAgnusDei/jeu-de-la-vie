<?php
require('model/CommentManager.php');
require('model/UserManager.php');
require('model/LikeManager.php');

$comments = [];

$userId = 1;

$request = CommentManager::getAllByDate();

while($data = $request->fetch())
{
	$comment = [];
	$comment['id'] = $data['id'];
	$comment['comment'] = $data['comment'];
	$comment['date'] = $data['comment_date_fr'];
	$comment['nbLikes'] = CommentManager::countLikes($comment['id']);
	$comment['likeState'] = LikeManager::getLikeState($data['id'], $userId, 'comment');
	$comment['nbDislikes'] = CommentManager::countDislikes($comment['id']);

	$userName = UserManager::getLoginById(
		CommentManager::getAuthorIdById($data['id'])
	);

	$comment['author'] = $userName;
	

	array_push($comments, $comment);
}

echo json_encode($comments);

