const sql = require("./db.js")
const bcrypt = require('bcrypt')
const saltRounds = 2;

const User = function (user) {
	this.email = user.email;
	this.password = user.password;
	this.type = user.type;
}

User.resetUser = (newUser, result) => {
	console.log("Model: User: resetUser: Invoked !");

	sqlQuery = "UPDATE end_user SET password = ? WHERE email = ?";
	bcrypt.hash(newUser.password, saltRounds, (hashErr, hash) => {
		if (hashErr) {
			console.log("Model: User: create: Error in hashing password !: ", hashErr)
			result({ "message": hashErr }, null)
		};

		sql.query(sqlQuery, [hash, newUser.email], (err, res) => {
			if (err) {
				console.log("Model: User: resetUser: Error !: ", err)
				result({ "message": err }, null);
			};
			result(null, { id: res.insertId, "user": newUser.email });
		});
	});

};

User.getUsers = (result) => {
	console.log("Model: User: getUsers: Invoked !");
	sqlQuery = "select email from end_user";
	sql.query(sqlQuery, (err, res) => {
		if(err){
			console.log("Model: User: getUsers: Error !: ", err)
			result({ "message": err });
		} else{
			result(null, res);
		}
	});
}
User.deleteUser = (email, result) => {
	console.log("Model: User: deleteUser: Invoked !");

	sqlQuery = "DELETE FROM end_user WHERE email = " + sql.escape(email);
	sql.query(sqlQuery, (err, res) => {
		if(err){
			console.log("Model: User: deleteUser: Error !: ", err)
			result({ "message": err });
		} else{
			result(null, res);
		}
	});
};
User.create = (newUser, result) => {
	console.log("Model: User: create: Invoked !");

	if(newUser.type == "custRep"){
		sqlQueryCheck = "SELECT * FROM customer_rep WHERE email = " + sql.escape(newUser.email);
		sqlQuery = "INSERT INTO customer_rep(email, password) VALUES(?,?)";
	}
	else {
		sqlQueryCheck = "SELECT * FROM end_user WHERE email = " + sql.escape(newUser.email);
		sqlQuery = "INSERT INTO end_user(email, password) VALUES(?,?)";
	};
	sql.query(sqlQueryCheck, (err, res) => {
		if (err) {
			console.log("Model: User: create check: Error !: ", err)
			result({ "message": err });
		};

		if (res.length > 0) {

			console.log("Model: User: create check: User already exists. Please login!")
			result({ "message": "User already exists. Please login!" });

		} else {
			bcrypt.hash(newUser.password, saltRounds, (hashErr, hash) => {
				if (hashErr) {
					console.log("Model: User: create: Error in hashing password !: ", hashErr)
					result({ "message": hashErr }, null)
				};

				sql.query(sqlQuery, [newUser.email, hash], (err, res) => {
					if (err) {
						console.log("Model: User: create: Error !: ", err)
						result({ "message": err }, null);
					};
					// console.log("Model: User: create: User Added: ", {id: res.insertId, "user": newUser.email, "password": hash, "type": newUser.type});
					result(null, { id: res.insertId, "user": newUser.email, "type": newUser.type });
				});
			});
		};
	});

};



User.signin = (newUser, result) => {
	console.log("Model: User: signin: Invoked !");
	if(newUser.type == "custRep"){
		sqlQuery = "SELECT * FROM customer_rep WHERE email = " + sql.escape(newUser.email);
	}
	else if(newUser.type == "admin"){
		sqlQuery = "SELECT * FROM admin WHERE email = " + sql.escape(newUser.email);
	}
	else{
		sqlQuery = "SELECT * FROM end_user WHERE email = " + sql.escape(newUser.email);
	};
	sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: User: signin: Error !: ", err)
			result({ "message": err });
			return;
		};

		if (res.length > 0) {
			bcrypt.compare(newUser.password, res[0].password, (hashErr, res) => {
				if (res == true) {
					console.log("Model: User: sigin: retreived login details.")
					result(null, { "user": newUser.email })
				} else {
					console.log("Model: User: signin: Incorrect password!")
					result({ "message": "Incorrect password!" }, null);
				}

			});
		} else {
			console.log("Model: User: signin: Error user does not exist. Please signup!")
			result({ "message": "Error user does not exist. Please signup!" }, null);
		};
	});
};
module.exports = User;