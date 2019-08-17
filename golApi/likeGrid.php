<?php
require('model/LikeManager.php');

$post = json_decode(file_get_contents('php://input'));
$gridId = $post[0];
$userId = $post[1];

$state = LikeManager::getLikeState($gridId, $userId, 'grid');

if($state != 'liked')
{
	$succes = LikeManager::gridLike($gridId, $userId);
}
else
{
	$succes = LikeManager::deleteGridLike($gridId, $userId);
}

echo json_encode($succes);