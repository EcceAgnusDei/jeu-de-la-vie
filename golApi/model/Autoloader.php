<?php
/**
 * Classe permettant l'autoload des classes
 */
class Autoloader
{	
	/**
	 * Méthode permettant d'initialiser l'autoloading
	 */
	static function register()
	{
		spl_autoload_register(array(__CLASS__, 'autoload'));
	}

	/**
	 * Méthode utilisée par la méthode d'initialisation pour définir le chemin des classes
	 * @param  String $className Nom de la classe
	 */
	static function autoload($className)
	{
		require './model/' . ucfirst($className) . '.php';
	}
}