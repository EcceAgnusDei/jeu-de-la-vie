<?php
/**
 * Classe mère permettant la connexion à une base de donnée
 */
class Manager
{
	/**
 	* Crée une connexion avec la base de donnée
	* @return PDO Objet de la connexion
 	*/
	protected static function dbConnect()
	{
		$dataBase = new PDO('mysql:host=localhost;dbname=projet5;charset=utf8', 'root', '');
		return $dataBase;
	}
}