<?php
/**
 * Ouvre la session admin
 * @param  string $user     identifiant
 * @param  string $password mot de passe
 */
function admin($login, $password)
{
	$userManager = new UserManager;
	$id = $userManager->userIdentifying($login, $password);
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

	require('view/backend/adminLoginView.php');
}

/**
 * Redirige vers la page de connexion lorsque les identifiant/mot de passe ne sont pas bons.
 */
function adminLogingError()
{
	$error = "<p style='color: red'>Identifiant ou mot de passe incorrect</p>";

	require('view/backend/adminLoginView.php');
}

/**
 * Affiche la page d'administration des créations
 */
function adminGridView()
{
	$gridManager = new GridManager();
	$userManager = new userManager();

	$grids = $gridManager->getVisible();

	require('view/backend/adminGridsView.php');
}

/**
 * Affiche les commentaires du plus récent au plus ancien
 */
function commentsByDateView()
{
	$commentManager = new CommentManager();
	$userManager = new userManager();

	$comments = $commentManager->getAllByDate();

	require('view/backend/adminCommentsView.php');
}

/**
 * Affiche les commentaires impopulaires par ordre d'impopularité
 */
function commentsByDislikesView()
{
	$commentManager = new CommentManager();
	$userManager = new userManager();

	$comments = $commentManager->getAllByDislikes();

	require('view/backend/adminCommentsView.php');
}

/**
 * Supprime un commentaire en mode admin
 * @param  Int $id Id du commentaire à supprimer
 */
function adminGridDelete($id)
{
	$gridManager = new GridManager();
	$likeManager = new LikeManager();
	$commentManager = new CommentManager();

	$ids = $commentManager->commentIdByGrid($id);

	foreach ($ids as $commentId)
	{
		adminCommentDelete($commentId);
	}

	$succes = $gridManager->delete($id);
	$likeManager->deleteGridLikes($id);

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
	$commentManager = new CommentManager();
	$likeManager = new LikeManager();
	$likeManager->deleteCommentLikes($id);
	$likeManager->deleteCommentDislikes($id);
	$succes = $commentManager->delete($id);

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
	$commentManager = new CommentManager();
	$commentManager->invisible($id);

	header('location: ' . $_SERVER['HTTP_REFERER']);
}

/**
 * Retire une création du dashbord admin
 * @param  Int $id Id de la création
 */
function gridApproval($id)
{
	$gridManager = new GridManager();
	$gridManager->invisible($id);

	header('location: ' . $_SERVER['HTTP_REFERER']);
}
?>