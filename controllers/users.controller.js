const User = require('../models/users.model.js')

exports.create = (req, res) => {
	if (!req.body){
		res.send("email or password cannot be empty !")
	};

	if (req.body.email.includes("admin") || req.body.email.includes("buyme.com")){
		res.send("Restricted Email. Please use another email.")
	};
	
	const user = new User({
		password: req.body.password,
		email: req.body.email,
		type: "user"
	});


	User.create(user, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Controller: User: create: Error occured in creating user."
			});
		else
			console.log("Controller: User: create: Created User Successfully!")
			res.send(data)
	});
};

exports.signin = (req, res) => {
	if (!req.body){
		res.send("email or password cannot be empty !")
	};
	var type = "";

	if (req.body.email.includes("admin")){
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
		if (err)
			res.status(500).send({
				message:
					err.message || "Controller: User: sigin: Error occured in sigin."
			});
		else
			console.log("Controller: User: create: Sigin Successful!")
			res.send(data)
	});

};