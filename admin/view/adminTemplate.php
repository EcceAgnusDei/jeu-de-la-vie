<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title><?= $title ?></title>

        <link href="/jeu-de-la-vie/admin/public/css/style.css" rel="stylesheet" />
        <link rel="shortcut icon" type="image/png" href="/automate-cellulaire/public/css/img/favicon.png">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.8.1/js/all.js" integrity="sha384-g5uSoOSBd7KkhAMlnQILrecXvzst9TdC09/VM+pjDTCM+1il8RHz5fKANTFFb+gQ" crossorigin="anonymous"></script>
        <script src="/jeu-de-la-vie/admin/public/js/buttons.js"></script>
        <?= $head ?>
    </head>
        
    <body>
    	<header>
            <div class="header-head header-content grid">
                <a href="index.php"><img class="logo" src="public/css/img/logo.png" alt="Accueil"></a>
                <nav>
                    <ul class="menu">
                        <li><a class="menu-item" href="index.php?adminaction=gridsview">Créations</a></li>
                        <li><a class="menu-item" href="index.php?adminaction=commentsbydateview">Commentaires</a></li>
                    </ul>
                </nav>
            </div>
            <div class="menu-burger">
                <div></div>
                <div></div>
                <div></div>
            </div>
    	</header>
        <?= $content ?>
        <footer class="client-footer">
            <p class="footer-content grid">&copy; 2019 Antoine Mondoloni . <a href="index.php?adminaction=adminlogout">Deconnexion</a></p>
        </footer>
    </body>
</html>
