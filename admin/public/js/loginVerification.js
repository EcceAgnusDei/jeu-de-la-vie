let logins = [];

window.addEventListener("load", loginVerification);

function loginVerification()
{
	$.get(
		'public/ajax/getLogins.php',
		'false',
		callback,
		'text'
		);

	$('#signin-login').keyup(function()
	{
		let exists = false;
		console.log($('#signin-login').val());
		for (let login of logins)
		{
			if ($('#signin-login').val() == login)
			{
				exists = true;
			}
		}

		if (exists || $('#signin-login').val() == '')
		{
			$('#signin-login').css('background-color', '#f35858');
		}
		else
		{
			$('#signin-login').css('background-color', '#169608');
		}
	});

	$('#signin-password').keyup(function()
	{
		if ($('#signin-password').val().length < 8)
		{
			$('#signin-password').css('background-color', '#f35858');
		}
		else
		{
			$('#signin-password').css('background-color', '#169608');
		}
	});

	$('form').submit(function(evt){
		let exists2;
		for (let login of logins)
		{
			if ($('#signin-login').val() == login)
			{
				exists2 = true;
			}
		}
		if (exists2)
		{
			evt.preventDefault();
			$('#error').css('display', 'block');
			$('#error').text('Ce pseudo existe déjà !');
		}
		else if ($('#signin-password').val().length < 8)
		{
			evt.preventDefault();
			$('#error').css('display', 'block');
			$('#error').text('Mot de passe trop court');
		}
	});
}

function callback(result)
{
	logins = JSON.parse(result);
}