<?php $head = ''; ?>
<?php ob_start(); ?>
<section class="comment-section grid last-section">
	<h3>La liste des commentaires</h3>
	<nav>
		<ul class="sort">
			<li><a href="index.php?adminaction=commentsbydateview" <?php if($_GET['adminaction']=='commentsbydateview'){echo "style= 'border-top: 1px solid #f38320;'";} ?> >Trier par date <i class="fas fa-sort-down"></i></a></li>
			<li><a href="index.php?adminaction=commentsbydislikesview" <?php if($_GET['adminaction']=='commentsbydislikesview'){echo "style= 'border-top: 1px solid #f38320;'";} ?> >Trier par impopularité <i class="fas fa-sort-down"></i></a></li>
		</ul>
	</nav>
	<?php
	while($data = $comments->fetch())
	{
	?>
	<div class="comment">
		<div class="comment-body">
			<p>
				<strong class="orange"><?= $userManager->getLoginById($data['author_id']); ?></strong>
				<em>le <?= $data['comment_date_fr'] ?> :</em>
			</p>

			<p>
				<?= nl2br($data['comment']) ?>
			</p>
			<p class="show-post"><a href="index.php?action=load&amp;id=<?= $data['grid_id'] ?>&amp;commentid=<?= $data['id'] ?>">Afficher la création</a></p>
		</div>
		<div class="comment-btns">
			<div><i class="fas fa-thumbs-down red"></i> <span class="red"> <?= $data['dislikes'] ?></div>
			<div>
				<button class="btn del-btn" onclick='window.location.href="index.php?adminaction=commentdelete&id=<?= $data['id'] ?>"'>Supprimer</button>
				<button class="btn" onclick='window.location.href="index.php?adminaction=commentinvisible&id=<?= $data['id'] ?>"'>Retirer de la liste</button>
			</div>
		</div>
	</div>
	<?php
	}
	?>
</section>
<?php $content = ob_get_clean(); ?>

<?php require('view/backend/adminTemplate.php'); ?>