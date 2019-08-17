<?php
/**
 * Ouvre la session admin
 * @param  string $user     identifiant
 * @param  string $password mot de passe
 */
function admin($login, $password)
{
	$id = UserManager::userIdentifying($login, $password);
	if ($id == 1)
	{
		$_SESSION['admin'] = true;
		$_SESSION['userid'] = 1;
		header('Location: index.php?adminaction=gridsview');
	}
	else
	{
		adminLogingError();
	}
}

/**
 * Redirige vers la page de connexion
 * @return [type] [description]
 */
function adminLogin()
{
	$error = '';

	require('view/adminLoginView.php');
}

/**
 * Redirige vers la page de connexion lorsque les identifiant/mot de passe ne sont pas bons.
 */
function adminLogingError()
{
	$error = "<p style='color: red'>Identifiant ou mot de passe incorrect</p>";

	require('view/adminLoginView.php');
}

/**
 * Affiche la page d'administration des créations
 */
function adminGridView()
{
	$grids = GridManager::getVisible();

	require('view/adminGridsView.php');
}

/**
 * Affiche les commentaires du plus récent au plus ancien
 */
function commentsByDateView()
{

	$request = CommentManager::getAllByDate();
	$comments = [];

	while($data = $request->fetch())
	{
		array_push($comments, $data);
	}

	require('view/adminCommentsView.php');
}

/**
 * Affiche les commentaires impopulaires par ordre d'impopularité
 */
function commentsByDislikesView()
{
	$request = CommentManager::getAllByDate();
	$comments = [];

	while($data = $request->fetch())
	{
		if (CommentManager::countDislikes($data['id']) > 0)
		{
			$data['dislikes'] = CommentManager::countDislikes($data['id']);
			array_push($comments, $data);
		}	
	}

	function compare($a, $b)
	{
		if ($a['dislikes'] == $b['dislikes'])
		{
			return 0;
		}
		return ($a['dislikes'] > $b['dislikes']) ? -1 : 1;
	}

	usort($comments, 'compare');

	require('view/adminCommentsView.php');
}

/**
 * Supprime un commentaire en mode admin
 * @param  Int $id Id du commentaire à supprimer
 */
function adminGridDelete($id)
{
	$ids = CommentManager::commentIdByGrid($id);

	foreach ($ids as $commentId)
	{
		adminCommentDelete($commentId);
	}

	$succes = GridManager::delete($id);

	if ($succes)
	{
		header('location: index.php?adminaction=gridsview');
	}
	else
	{
		throw new Exception('Désolé, la suppression n\'a peu se faire');
	}
}

/**
 * Supprime le commentaire en mode admin
 * @param  Int $id Id du commentaire à supprimer
 */
function adminCommentDelete($id)
{
	LikeManager::deleteCommentLikes($id);
	LikeManager::deleteCommentDislikes($id);
	$succes = CommentManager::delete($id);

	if ($succes)
	{
		header('location: ' . $_SERVER['HTTP_REFERER']);
	}
	else
	{
		throw new Exception('Désolé, la suppression n\'a peu se faire');
	}
}

/**
 * Retire un commentaire du dashbord admin
 * @param  Int $id Id du commentaire
 */
function commentInvisible($id)
{
	CommentManager::invisible($id);

	header('location: ' . $_SERVER['HTTP_REFERER']);
}

/**
 * Retire une création du dashbord admin
 * @param  Int $id Id de la création
 */
function gridApproval($id)
{
	GridManager::invisible($id);

	header('location: ' . $_SERVER['HTTP_REFERER']);
}
?>