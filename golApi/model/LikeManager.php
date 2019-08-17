<?php

require_once("Manager.php");

/**
 * Classe permetant de gérer les likes.
 */
class LikeManager extends Manager
{	
	/**
	 * Permet de liker une création
	 * @param  Int $gridId Id de la création
	 * @param  Int $userId Id de l'utilisateur qui like
	 * @return [type]         [description]
	 */
	static function gridLike($gridId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('INSERT INTO grid_likes (grid_id, user_id) VALUES (?, ?)');
		$succes = $request->execute(array($gridId, $userId));

		return $succes;
	}

	/**
	 * Like un commentaire
	 * @param  Int $commentId Id du commentaire
	 * @param  Int $userId    Id de l'utilisateur qui like
	 * @return Bool            Renvoie true si l'opération s'est bien effectuée
	 */
	static function commentLike($commentId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)');
		$succes = $request->execute(array($commentId, $userId));

		return $succes;
	}

	/**
	 * Dislike un commentaire
	 * @param  Int $commentId Id du commentaire
	 * @param  Int $userId    Id de l'utilisateur qui dislike
	 * @return Bool            Renvoie true si l'opération s'est bien effectuée
	 */
	static function commentDislike($commentId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('INSERT INTO comment_dislikes (comment_id, user_id) VALUES (?, ?)');
		$succes = $request->execute(array($commentId, $userId));

		return $succes;
	}

	/**
	 * Permet de savoir si une création est liké d'un utilisateur
	 * @param  Int $gridId Id de la création
	 * @param  Int $userId id de l'utilisateur
	 * @return Bool         Retourne true si la création est likée de l'utilisateur
	 */
	static function gridIsLiked($gridId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT id FROM grid_likes WHERE grid_id = ? AND user_id = ?');
		$request->execute(array($gridId, $userId));
		$data = $request->fetch();

		if ($data === false)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	/**
	 * Permet de savoir si un commentaire a été liké par un utilisateur
	 * @param  Int $commentId Id du commentaire
	 * @param  Int $userId    Id de l'utilisateur
	 * @return Bool            Renvoie true si le commentaire est liké par l'utilisateur
	 */
	static function commentIsLiked($commentId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT id FROM comment_likes WHERE comment_id = ? AND user_id = ?');
		$request->execute(array($commentId, $userId));
		$data = $request->fetch();

		if ($data === false)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	/**
	 * Permet de savoir si un commentaire a été disliké par un utilisateur
	 * @param  Int $commentId Id du commentaire
	 * @param  Int $userId    Id de l'utilisateur
	 * @return Bool            Renvoie true si le commentaire a été disliké par l'utilisateur
	 */
	static function commentIsDisliked($commentId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT id FROM comment_dislikes WHERE comment_id = ? AND user_id = ?');
		$request->execute(array($commentId, $userId));
		$data = $request->fetch();

		if ($data === false)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	/**
	 * Supprime les likes d'une création
	 * @param  Int $gridId Id de la création
	 * @return Bool         Renvoie true si l'opération s'est bien effectuée
	 */
	static function deleteGridLike($gridId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('DELETE FROM grid_likes WHERE grid_id = ? AND user_id = ?');
		$succes = $request->execute(array($gridId, $userId));

		return $succes;
	}

	/**
	 * Supprime les likes d'un commentaire
	 * @param  Int $commentId Id du commentaire
	 * @return Bool           Renvoie true si l'opération s'est bien effectuée
	 */
	static function deleteCommentLike($commentId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?');
		$succes = $request->execute(array($commentId, $userId));

		return $succes;
	}

	/**
	 * Supprime les dislikes d'un commentaire
	 * @param  Int $commentId Id du commentaire
	 * @return Bool           Renvoie true si l'opération s'est bien effectuée
	 */
	static function deleteCommentDislike($commentId, $userId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('DELETE FROM comment_dislikes WHERE comment_id = ? AND user_id = ?');
		$succes = $request->execute(array($commentId, $userId));

		return $succes;
	}

	/**
	 * Permet de supprimer tous les likes d'un utilisateur
	 * @param  Int $id Id de l'utilisateur
	 * @return Bool     Renvoie true si l'opération s'est bien effectuée
	 */
	static function userDelete($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('DELETE FROM comment_dislikes WHERE user_id = ?');
		$succes = $request->execute(array($id));
		$request->closeCursor();

		$request = $dataBase->prepare('DELETE FROM comment_likes WHERE user_id = ?');
		$succes2 = $request->execute(array($id));
		$request->closeCursor();

		$request = $dataBase->prepare('DELETE FROM grid_likes WHERE user_id = ?');
		$succes3 = $request->execute(array($id));

		return $succes && $succes2;
	}

	static function getGridLikers($gridId)
	{
		$dataBase = self::dbConnect();

		$likers = [];

		$request = $dataBase->prepare('SELECT user_id FROM grid_likes WHERE grid_id = ?');
		$request->execute(array($gridId));

		while($data = $request->fetch())
		{
			array_push($likers, $data['user_id']);
		}

		return $likers;
	}

	static function getLikeState($elementId, $currentUserId, $element)
	{
		$dataBase = self::dbConnect();

		$request = $dataBase->prepare('SELECT id FROM ' . $element . '_likes WHERE ' . $element . '_id = ? AND user_id = ?');
		$request->execute(array($elementId, $currentUserId));
		$isLiked = $request->fetch();

		$request->closeCursor();

		if($element === "comment") {
			$request = $dataBase->prepare('SELECT id FROM comment_dislikes WHERE comment_id = ? AND user_id = ?');
			$request->execute(array($elementId, $currentUserId));
			$isDisliked = $request->fetch();
		}

		
		if($isLiked != false)
		{
			return 'liked';
		}
		else if($element === 'comment' && $isDisliked != false)
		{
			return 'disliked';
		}
	}
}