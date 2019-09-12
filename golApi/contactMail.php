<?php
require('model/UserManager.php');

$post = json_decode(file_get_contents('php://input'));

$userName = UserManager::getLoginById($post[0]);
$content = $post[1];

$header = "MIME-Version: 1.0\r\n";
$header.="From:'mondoloni-dev.fr'<support@mondoloni-dev.fr>"."\n";
$header.='Content-Type:text/html; charset="utf-8"'."\n";
$header.='Content-Transfert-Encoding: 8bit';

$message = 'Nom: ' . $userName . '
';
$message .= $content;
mail('mondo.antoine@yahoo.fr', "Contact", $message);