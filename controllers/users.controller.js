const User = require('../models/users.model.js')

exports.create = (req, res) => {
	if (!req.body) {
		res.render('pages/signup', { "status": 400, "data": { "message": "Values cannot be empty!", "alertType": "danger" } });
	}
	else if (req.body.email.includes("admin") || req.body.email.includes("buyme.com")) {
		res.render('pages/signup', { "status": 400, "data": { "message": "Restricted email. Please use another email id", "alertType": "danger" } });
	}
	else {
		const user = new User({
			password: req.body.password,
			email: req.body.email,
			type: "user"
		});

		User.create(user, (err, data) => {
			if (err) {
				res.render('pages/signup', { "status": 500, "data": { "message": err.message, "alertType": "danger" } })
			}

			else {
				console.log("Controller: User: create: Created User Successfully!")
				res.render('pages/index', { "status": 201, "data": { "message": "Account succesfully created!", "alertType": "success" } });
			}
		});
	};
};

exports.signin = (req, res) => {
	if (!req.body) {
		res.send("email or password cannot be empty !")
	};
	var type = "";

	if (req.body.email.includes("admin")) {
		type = "admin"
	} else if (req.body.email.includes("buyme.com")) {
		type = "custRep"
	} else {
		type = "user"
	}

	const user = new User({
		password: req.body.password,
		email: req.body.email,
		type: type
	});

	User.signin(user, (err, data) => {
		if (err) {
			res.render('pages/index', { "status": 500, "data": { "message": err.message, "alertType": "danger" } });
		}
		else {
			console.log("Controller: User: create: Sigin Successful!")
			req.session.loggedIn = true
			req.session.user = data.user
			
			if (type == "admin"){
				res.redirect('/adminHome');
			}
			else if(type == "custRep"){
				res.redirect('/custRepHome');
			}
			else{
				res.redirect('/home');
			};
		}
	});

};