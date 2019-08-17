<?php 
$title = 'Administrez les créations';
?>
<?php ob_start(); ?>
<script src="public/js/grid.js"></script>
<script src="public/js/showMiniature.js"></script>
<?php $head = ob_get_clean(); ?>

<?php ob_start(); ?>
<section class="grid last-section grids-view">
	<h3>Administration des créations</h3>
	<div class="artwork-container">
<?php
while ($data = $grids->fetch())
{
	$author = $userManager->getLoginById($data['author_id']); ?>
	<div class="artwork"><canvas id="canvas<?= $data['id'] ?>"></canvas>
		<p class="grids-title"><a href="index.php?action=load&amp;id=<?= $data['id'] ?>"><?= $data['name'] ?> de <?= $author?></a> <span class="blue"> <i class="fas fa-thumbs-up"></i> <?= $data['likes'] ?></span></p>
		<div class="artwork-admin-btn">
			<button class="btn grid-approval-btn" onclick='window.location.href="index.php?adminaction=gridapproval&id=<?= $data['id']  ?>"'>Retirer de la liste</button>
			<button class="btn grid-delete-btn" onclick='window.location.href="index.php?adminaction=griddelete&id=<?= $data['id']  ?>"'>Supprimer</button>
		</div>
	</div>
	<script>
		showMiniature (<?= $data['json'] ?>, "canvas<?= $data['id'] ?>");
	</script>
<?php
}
?>
	</div>
</section>

<?php $content = ob_get_clean(); ?>

<?php require('view/backend/adminTemplate.php'); ?>