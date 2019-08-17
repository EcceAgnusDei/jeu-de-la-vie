<?php

require_once("Manager.php");

/**
 * Classe permetant de gérer les utilisateurs
 */
class UserManager extends Manager
{
	/**
	 * Enregistre l'utilisateur lors de son inscription
	 * @param  String $login    Identifiant de l'utilisateur
	 * @param  String $password Mot de passe de l'utilisateur
	 * @param  String $email    Mail de l'utilisateur
	 * @return Bool           Renvoie true si l'enregistrement s'est bien passé
	 */
	static function saveUser($login, $password,$email)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('INSERT INTO users(login,password,email,signin_date) VALUES (?,?,?, NOW())');
		$succes = $request->execute(array($login, password_hash($password, PASSWORD_DEFAULT), $email));

		return $succes;
	}

	/**
	 * Obtient l'id de l'utilisateur
	 * @param  String $login    Identifiant
	 * @param  String $password Mot de passe
	 * @return PDOStatement           Id de l'utilisateur
	 */
	static function userIdentifying($login, $password)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT password FROM users WHERE login = ?');
		$request->execute(array($login));
		$dbPassword = $request->fetch();
		$dbPassword = $dbPassword['password'];
		$request->closeCursor();
		if (password_verify($password, $dbPassword))
		{
			$request = $dataBase->prepare('SELECT id FROM users WHERE login = ?');
			$request->execute(array($login));
			$id = $request->fetch();
			return $id['id'];
		}
		else 
		{
			return false;
		}
	}

	/**
	 * Obtient le nom de l'utilisateur grace à son id
	 * @param  int $id id de l'utilisateur
	 * @return String Pseudo de l'utilisateur    
	 */
	static function getLoginById($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT login FROM users WHERE id = ?');
		$request->execute(array($id));
		$login = $request->fetch();
		$login = $login[0];

		return $login;
	}

	/**
	 * Permet d'obtenir les infos de tous les utilisateurs
	 * @return PDOStatment Les utilisateurs
	 */
	static function getUsers()
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->query('SELECT login, email FROM users');

		return $request;
	}

	/**
	 * Permet de retrouver un utilisateur grace à son mail
	 * @param  String $email L'email de l'utilisateur
	 * @return PDOStatment        L'utilisateur
	 */
	static function getUserByEmail($email)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('SELECT login, password FROM users WHERE email = ?');
		$request->execute(array($email));

		return $request;
	}

	/**
	 * Supprime une compte utilisateur
	 * @param  Int $id Id de l'utilisateur
	 * @return Bool     Renvoie true si l'opération s'est bien effectuée
	 */
	static function delete($id)
	{
		$dataBase = self::dbConnect();
		$request = $dataBase->prepare('DELETE FROM users WHERE id = ?');
		$succes = $request->execute(array($id));

		return $succes;
	}
}