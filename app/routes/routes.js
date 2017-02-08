var User = require('../models/user');

module.exports = function(router) {

	router.post('/register', function(req, res) {
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

	return router;
}