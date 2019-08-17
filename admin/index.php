<?php
if(session_status() == PHP_SESSION_NONE)
{
    session_start();
}
require_once('../golApi/model/Autoloader.php');
Autoloader::register();
require_once('controller/clientController.php');
require_once('controller/adminController.php');

try
{
	if (isset($_GET['action']) && $_GET['action'] == 'adminidentifying')
	{
		admin($_POST['login'], $_POST['password']);
	}
	elseif (isset($_SESSION['admin']))
	{
		if (isset($_GET['adminaction']))
		{
			switch ($_GET['adminaction'])
			{
				case 'adminlogout':
				{
					userLogout();
				}
				break;

				case 'gridsview':
				{
					adminGridView();
				}
				break;

				case 'commentsbydateview':
				{
					commentsByDateView();
				}
				break;

				case 'commentsbydislikesview':
				{
					commentsByDislikesView();
				}
				break;

				case 'griddelete':
				{
					if (isset($_GET['id']) && $_GET['id'] > 0) 
					{
						adminGridDelete($_GET['id']);
					}
					else 
					{
						throw new Exception('Aucun identifiant de grid envoyé');
					}	
				}
				break;

				case 'commentdelete':
				{
					if (isset($_GET['id']) && $_GET['id'] > 0) 
					{
						adminCommentDelete($_GET['id']);
					}
					else 
					{
						throw new Exception('Aucun identifiant de commentaire envoyé');
					}
				}
				break;

				case 'commentinvisible':
				{
					if (isset($_GET['id']) && $_GET['id'] > 0) 
					{
						commentInvisible($_GET['id']);
					}
					else 
					{
						throw new Exception('Aucun identifiant de commentaire envoyé');
					}
				}
				case 'gridapproval':
				{
					if (isset($_GET['id']) && $_GET['id'] > 0) 
					{
						gridApproval($_GET['id']);
					}
					else 
					{
						throw new Exception('Aucun identifiant de commentaire envoyé');
					}
				}
			}
		}
	}
	else
	{
		adminLogin();
	}
}
catch (Exception $e)
{
	$errorMessage = $e->getMessage();
	require('view/frontend/errorView.php');
}