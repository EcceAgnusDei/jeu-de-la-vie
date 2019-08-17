<?php
require('model/CommentManager.php');
require('model/UserManager.php');
require('model/LikeManager.php');

$post = json_decode(file_get_contents('php://input'));
$gridId = $post[0];
$currentUserId = $post[1];

$comments = [];

$request = CommentManager::getComments($gridId);

while($data = $request->fetch())
{
	$comment = [];
	$comment['id'] = $data['id'];
	$comment['comment'] = $data['comment'];
	$comment['date'] = $data['comment_date_fr'];
	$comment['likeState'] = LikeManager::getLikeState($comment['id'], $currentUserId, 'comment');
	$comment['nbLikes'] = CommentManager::countLikes($comment['id']);
	$comment['nbDislikes'] = CommentManager::countDislikes($comment['id']);

	$userName = UserManager::getLoginById(
	CommentManager::getAuthorIdById($data['id'])
	);

	$comment['author'] = $userName;

	array_push($comments, $comment);
}

echo json_encode($comments);

