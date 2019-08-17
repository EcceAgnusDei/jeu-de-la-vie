<?php

require_once("Manager.php");

/**
 * Classe permetant de gérer les commentaires.
 */
class CommentManager extends Manager
{
	/**
	 * Méthode permettant d'obtenir les commentaires d'un article.
	 * @param int $gridId Id de la création dont on souhaite obtenir les commentaires
	 * @return PDOStatement Requête obtenue à partir de la table comment.
	 */
	static function getComments($gridId)
	{
		$dataBase = self::dbConnect();
		$comments = $dataBase->prepare('SELECT id, likes, dislikes, author_id, comment, DATE_FORMAT(comment_date, \'%d/%m/%Y à %Hh%imin\') AS comment_date_fr FROM comments WHERE grid_id = ? ORDER BY id DESC');
		$comments->execute(array($gridId));

		return $comments;
	}

	/**
	 * Permet d'obtenir un commentaire à partir de son id
	 * @param  Int $id id du commentaire
	 * @return PDOStatment     Le commentaire
	 */
	static function getCommentById($id)
	{
		$dataBase = self::dbConnect();
		$comment = $dataBase->prepare('SELECT id, likes, dislikes, author_id, comment, DATE_FORMAT(comment_date, \'%d/%m/%Y à %Hh%imin\') AS comment_date_fr FROM comments WHERE id = ?');
		$comment->execute(array($id));

		return $comment;
	}

	/**
	 * Selectionne tous les commentaires et les classe du plus ancien
	 * au plus récent
	 * @return PDOStatement Requête obtenue à partir de la table comment
	 */
	static function getAllByDate()
	{
		$dataBase = self::dbConnect();
		$comments = $dataBase->query('SELECT id, grid_id, author_id, comment, likes, dislikes, DATE_FORMAT(comment_date, \'%d/%m/%Y à %Hh%imin\') AS comment_date_fr FROM comments WHERE visibility = 1 ORDER BY comment_date DESC');

		return $comments;
	}

	/**
	 * Selectionne les commentaires ayant été signalés et les ordonne
	 * par nombre de signalement décroissant
	 * @return PDOStatement Requête obtenue à partir de la table comment
	 */
	static function getAllByDislikes()
	{
		$dataBase = self::dbConnect();
		$comments = $dataBase->query('SELECT id, grid_id, author_id, comment, likes, dislikes, DATE_FORMAT(comment_date, \'%d/%m/%Y à %Hh%imin\') AS comment_date_fr FROM comments WHERE dislikes > 0 AND visibility = 1 ORDER BY dislikes DESC');

		return $comments;
	}


	/**
	 * Méthode enregistrant le commentaire dans la base de données
	 * @param  int $postId  id du post dans lequel on veut inclure le commentaire
	 * @param  string $author  Auteur du commentaire
	 * @param  string $comment Le commentaire
	 * @return bool          Retourne true si l'enregistrement s'est bien effectué
	 */
	static function addComment($GridId, $authorId, $comment)
	{
		$dataBase = self::dbConnect();
		$comments = $dataBase->prepare('INSERT INTO comments(grid_id, author_id, comment, comment_date) VALUES(?,?,?, NOW())');
		$succes = $comments->execute(array($GridId, $authorId, $comment));

		return $succes;
	}

	/**
	 * Signal un commentaire
	 * @param  int $commentId Id du commentaire à signaler
	 * @return bool Renvoie true si le signalement s'est bien déroulé           
	 */
	static function signal($commentId)
	{
		$dataBase = self::dbConnect('projet4');
		$signalement = $dataBase->prepare('SELECT signalement FROM comments WHERE id = ?');
		$signalement->execute(array($commentId));

		$signalFetch = $signalement->fetch();
		$signalNumber = (int)$signalFetch['signalement'];
		$signalNumber++;

		$signalement->closeCursor();
		$signalement = $dataBase->prepare('UPDATE comments SET signalement = ? WHERE id = ?');
		$succes = $signalement->execute(array($signalNumber, $commentId));
		return $succes;
	}

	/**
	 * Annule le signalement d'un commentaire
	 * @param  id $commentId Id du commentaire dont on veut annuler les signalements
	 * @return bool            Renvoie true si l'accion s'est bien déroulée
	 */
	static function unsignal($commentId)
	{
		$dataBase = self::dbConnect('projet4');
		$request = $dataBase->prepare('UPDATE comments SET signalement = 0 WHERE id = ?');
		$succes = $request->execute(array($commentId));
		return $succes;
	}

	/**
	 * permet de supprimer un commentaire
	 * @param  int $id Id du commentaire à supprimer
	 * @return bool     Renvoie true si le commentaire à bien été supprimé
	 */
	static function delete($id)
	{
		$dataBase = self::dbConnect();
		$del = $dataBase->prepare('DELETE FROM comments WHERE id = ?');
		$succes = $del->execute(array($id));

		return $succes;
	}

	/**
	 * Permet d'obtenir l'ensemble des id des commentaires d'un grid
	 * @param  Int $gridId Id du grid
	 * @return Array        Tableau contenant les id des commentaires
	 */
	static function commentIdByGrid($gridId)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT id FROM comments WHERE grid_id = ?');
		$request->execute(array($gridId));
		$ids = [];

		while ($data = $request->fetch())
		{
			array_push($ids, $data['id']);
		}

		return $ids;
	}

	/**
	 * Permet de compter le nombre de commentaires d'un article
	 * @param  int $id Id du grid dont on veut compter le nombre de commentaires
	 * @return int     Le nombre de commentaires
	 */
	static function countComments($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT COUNT(*) AS nb_comments FROM comments WHERE grid_id = ?');
		$request->execute(array($id));
		$data = $request->fetch();

		return $data['nb_comments'];
	}

	/**
	 * Rend le commentaire invisible pour l'admin
	 * @param Int $id Id du commentaire que l'on souhaite rendre invisible
	 */
	static function invisible($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('UPDATE comments SET visibility = 0 WHERE id = ?');
		$request->execute(array($id));
	}

	/**
	 * Permet d'obtenir l'ensemble des commentaire d'un même auteur.
	 * @param  Id $userId Id de l'auteur.
	 * @return Pdostatment         Commentaires de l'auteur.
	 */
	static function getCommentsByUserId($userId)
	{
		$dataBase = self::dbConnect();
		$comments = $dataBase->prepare('SELECT id, likes, author_id, dislikes, grid_id, comment, DATE_FORMAT(comment_date, \'%d/%m/%Y à %Hh%imin\') AS comment_date_fr FROM comments WHERE author_id = ? ORDER BY comment_date DESC');
		$comments->execute(array($userId));

		return $comments;
	}

	/**
	 * Permet de supprimer tous les commentaires d'un utilisateur
	 * @param  Int $id Id de l'utilisateur
	 * @return Bool     Retourne true si l'opération s'est bien effectuée
	 */
	static function userDelete($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('DELETE FROM comments WHERE author_id = ?');
		$succes = $request->execute(array($id));

		return $succes;
	}

	/**
	 * Permet d'obtenir l'id de l'auteur à partir de celui du commentaire
	 * @param  Int $id Id du commentaire
	 * @return int     Id de l'auteur
	 */
	static function getAuthorIdById($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT author_id FROM comments WHERE id = ?');
		$request->execute(array($id));

		$author_id = $request->fetch();
		$author_id = $author_id[0];
		return $author_id;
	}

	static function countLikes($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT COUNT(*) AS nb_likes FROM comment_likes WHERE comment_id = ?');
		$request->execute(array($id));
		$data = $request->fetch();

		return $data['nb_likes'];
	}

	static function countDislikes($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT COUNT(*) AS nb_dislikes FROM comment_dislikes WHERE comment_id = ?');
		$request->execute(array($id));
		$data = $request->fetch();

		return $data['nb_dislikes'];
	}
}