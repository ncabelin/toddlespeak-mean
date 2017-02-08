var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./app/models/user');
var connection = require('./config/database');
var router = express.Router();
var appRoutes = require('./app/routes/routes')(router);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', appRoutes);


app.listen(port, process.env.IP, function() {
	console.log('Server started at port ' + port);
});