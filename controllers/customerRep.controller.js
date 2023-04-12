const User = require('../models/users.model.js')


exports.getUsers = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    } else{
        User.getUsers( (err, data) => {
            if (err){
                res.status(500).send({
                    message:
                        err.message || "Controller: customerRep: getUsers: Some error occured."
                });
            }
            else{
                console.log("Controller: customerRep: getUsers: Fetched users");
                console.log(data);
                res.render('pages/customerRepResetPass', { "user": req.session.user, "data": data});
            };
        })
    };
};

exports.resetUser = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    } else{
        const user = new User({
			password: req.body.password,
			email: req.body.email,
			type: "user"
		});

		User.resetUser(user, (err, data) => {
			if (err) {
				res.status(500).send({
                    message:
                        err.message || "Controller: customerRep: getUsers: Some error occured."
                });
			}

			else {
				console.log("Controller: customerRep: resetUser: resetUser Successful!")
                req.session.alertData = {"message": "reset user Successful!", "alertType": "success"};
				res.redirect("/custRepHome");
			}
		});
    };
};