window.addEventListener("load", buttons);

function buttons()
{
	window.addEventListener('resize', function() {
		if (window.matchMedia("(max-width: 540px)").matches)
		{
			$('.explanation-arrow').html('<i class="fas fa-long-arrow-alt-down"></i>');
		}
		else if (window.matchMedia("(min-width: 541px)").matches)
		{
			$('.explanation-arrow').html('<i class="fas fa-long-arrow-alt-right"></i>');
		}
	});
}
