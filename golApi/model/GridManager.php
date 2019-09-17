<?php

require_once("Manager.php");

/**
 * Classe permetant de gérer les créations.
 */
class GridManager extends Manager
{
	/**
	 * Permet de Sauvegarder une création dans la base de données
	 * @param  String $coords Version littérale d'un array comportant les coordonnées des carrés noirs
	 * @param  Int $id   Id de l'auteur
	 * @param  String $name Nom de l'oeuvre
	 * @return Bool       Renvoie true si l'enregistrement s'est bien effectué
	 */
	static function save($coords, $id, $name)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('INSERT INTO grids(coords,author_id, name,grid_date) VALUES (?,?,?, NOW())');
		$succes = $request->execute(array($coords, $id, $name));

		return $succes;
	}

	/**
	 * Charge un création à partir de la base de données
	 * @param  Int $id Id de la création
	 * @return Array     Création
	 */
	static function load($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT * FROM grids WHERE id = ?');
		$request->execute(array($id));
		$grid = $request->fetch();

		return $grid;
	}

	/**
	 * Permet de charger toutes les créations et les classe du plus récent au plus ancien
	 * @return PDOStatment L'ensemble des créations
	 */
	static function getGridsByDate()
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->query('SELECT id, name,coords, author_id, DATE_FORMAT(grid_date, \'%d/%m/%Y à %Hh%imin\') AS grid_date_fr FROM grids ORDER BY grid_date DESC');

		return $request;
	}

	/**
	 * Permet de charger toutes les créations et les classe en fonction de leur nombre de likes
	 * @return PDOStatment Les créations
	 */
	static function getGridsByLikes()
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->query('SELECT id, name,coords, author_id, DATE_FORMAT(grid_date, \'%d/%m/%Y à %Hh%imin\') AS grid_date_fr FROM grids ORDER BY likes DESC');

		return $request;
	}

	/**
	 * Permet d'obtenir une création par son id
	 * @param  Int $id Id de la création
	 * @return PdoStatment     Requète obtenue
	 */
	static function getGridById($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT id, name,coords, client_visibility, visibility, author_id, DATE_FORMAT(grid_date, \'%d/%m/%Y à %Hh%imin\') AS grid_date_fr FROM grids WHERE id = ?');
		$request->execute(array($id));

		return $request;
	}

	/**
	 * Permet d'obtenir toutes les créations d'un même auteur
	 * @param  Int $id Id de l'auteur
	 * @return PDOStatment     Les créations de l'auteur
	 */
	static function getGridsByAuthorId($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT id, name, coords, DATE_FORMAT(grid_date, \'%d/%m/%Y à %Hh%imin\') AS grid_date_fr FROM grids WHERE author_id = ? ORDER BY id DESC');
		$request->execute(array($id));

		return $request;
	}

	/**
	 * Supprime une création
	 * @param  Int $id Id de la création à supprimer
	 * @return Bool     Renvoie true si la suppression s'est bien effectuée
	 */
	static function delete($id)
	{
		$dataBase = self::dbConnect();
		$del = $dataBase->prepare('DELETE FROM grids WHERE id = ?');
		$succes = $del->execute(array($id));

		return $succes;
	}

	/**
	 * Permet d'obtenir l'id de l'auteur à partir de celui de la création
	 * @param  Int $id Id de la création
	 * @return int     Id de l'auteur
	 */
	static function getAuthorIdById($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT author_id FROM grids WHERE id = ?');
		$request->execute(array($id));

		$author_id = $request->fetch();
		$author_id = $author_id[0];
		return $author_id;
	}

	/**
	 * Permet de liker une création
	 * @param  Int $id Id de la création likée
	 * @return Bool     Renvoie true si l'opération s'est bien effectuée
	 */
	static function like($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('UPDATE grids SET likes=likes+1 WHERE id = ?');
		$succes = $request->execute(array($id));

		return $succes;
	}

	/**
	 * Rend la création invisible pour le dashbord de l'administrateur
	 * @param  Int $id Id de la création
	 */
	static function setInvisible($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('UPDATE grids SET visibility = 0 WHERE id = ?');
		$request->execute(array($id));
	}

	static function setVisible($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('UPDATE grids SET visibility = 1 WHERE id = ?');
		$request->execute(array($id));
	}

	/**
	 * Permet d'obtenir toutes les créations visibles
	 * @return PDOStatment Les créations visibles
	 */
	static function getVisible()
	{
		$dataBase = self::dbConnect();
		$grids = $dataBase->query('SELECT * FROM grids WHERE visibility = 1 ORDER BY grid_date DESC');

		return $grids;
	}

	/**
	 * Permet d'obtenir toutes les créations visibles coté client
	 * @return PDOStatment Les créations visibles
	 */
	static function getClientVisible()
	{
		$dataBase = self::dbConnect();
		$grids = $dataBase->query('SELECT * FROM grids WHERE client_visibility = 1 ORDER BY grid_date DESC');

		return $grids;
	}

	/**
	 * Permet de supprimer toutes les créations d'un même utilisateur
	 * @param  Int $id id de l'utilisateur
	 * @return Bool     Renvoie true si l'opération s'est bien effectuée
	 */
	static function userDelete($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('DELETE FROM grids WHERE author_id = ?');
		$succes = $request->execute(array($id));

		return $succes;
	}

	static function countLikes($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT COUNT(*) AS nb_likes FROM grid_likes WHERE grid_id = ?');
		$request->execute(array($id));
		$data = $request->fetch();

		return $data['nb_likes'];
	}

	static function setClientVisible($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('UPDATE grids SET client_visibility = 1 WHERE id = ?');
		$request->execute(array($id));
	}

	static function setClientUnvisible($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('UPDATE grids SET client_visibility = 0 WHERE id = ?');
		$request->execute(array($id));
	}
}