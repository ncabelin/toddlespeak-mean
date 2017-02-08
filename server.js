var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./app/models/user');
var connection = require('./config/database')

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});

app.post('/register', function(req, res) {
	var user = new User;
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if (!user.username ||
		!user.password ||
		!user.email) {
		res.status(400).send('Please fill in all fields');
	} else {
		user.save(function(err) {
			if (err) {
				res.status(400).send('Email, Username already exists');
			} else {
				res.json('Registered');
			}
		})
	}
});

app.listen(port, process.env.IP, function() {
	console.log('Server started at port ' + port);
});