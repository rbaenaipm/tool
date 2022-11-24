const mysql2 = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const alert = require('alert');

const connection = mysql2.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'admin',
	database : 'nodelogin'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/form');
			} else {
				response.redirect('/');
				
				//response.sendFile(path.join(__dirname + '/static/login.html'));
				//response.send('Usuario y/o Contraseña Incorrecta');
				alert('Usuario y/o Contraseña Incorrecta');
				
			}			
			response.end();
		});
	} else {
		response.redirect('/');
		alert('Usuario y/o Contraseña Incorrecta');
		//response.send('Por favor ingresa Usuario y Contraseña!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/form', function(request, response) {
	// Render login template
	if(request.session.loggedin){
		
		response.sendFile(path.join(__dirname + '/static/form.html'));

	}else{
		response.redirect('/');
		alert('¡Inicia sesión para ver esta página!');
		//response.send('¡Inicia sesión para ver esta página!');
	}

});

//Logout session
app.get('/logout', function(req,res){

    req.session.destroy();

    res.redirect('/')

});

app.listen(3000);