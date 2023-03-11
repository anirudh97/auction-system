const sql = require("./db.js")
const bcrypt = require('bcrypt')
const saltRounds = 2;

const User = function(user) {
	this.email = user.email;
	this.password = user.password;
	this.type = user.type;
}

User.create = (newUser, result) => {
	console.log("Model: User: create: Invoked !");

	sqlQueryCheck = "SELECT * FROM users WHERE email = " + sql.escape(newUser.email)
	sql.query(sqlQueryCheck, (err, res) => {
		if(err) {
			console.log("Model: User: create check: Error !: ", err)
			result({"message": err});
			return;
		};

		if (res.length > 0){

			console.log("Model: User: create check: User already exists. Please login!")
			result({"message": "User already exists. Please login!"});
			return;

		} else{
			bcrypt.hash(newUser.password, saltRounds, (hashErr, hash) => {
				if (hashErr) {
					console.log("Model: User: create: Error in hashing password !: ", hashErr)
					result({"message": hashErr}, null)
					return;
				};

				sqlQuery = "INSERT INTO users(email, password, type) VALUES(?,?,?)";
				sql.query(sqlQuery, [newUser.email, hash, newUser.type], (err, res) => {
					if (err) {
						console.log("Model: User: create: Error !: ", err)
						result({"message": err}, null);
						return;
					};
					console.log("Model: User: create: User Added: ", {id: res.insertId, "user": newUser.email, "password": hash, "type": newUser.type});
					result(null, {id: res.insertId, "user": newUser.email, "password": hash, "type": newUser.type})
				});
			});
		};
	});

};



User.signin = (newUser, result) => {
	console.log("Model: User: signin: Invoked !");
	sqlQuery = "SELECT * FROM users WHERE email = " + sql.escape(newUser.email)
	sql.query(sqlQuery, (err, res) => {
		if (err) {
				console.log("Model: User: signin: Error !: ", err)
				result({"message": err});
				return;
		};

		if (res.length > 0){
			bcrypt.compare(newUser.password, res[0].password, (hashErr, res) => {
				if (res == true){
					console.log("Model: User: sigin: retreived login details. : ", res)
					result(null, {"message": "YOLO!"})
				}else{
					console.log("Model: User: signin: Incorrect password!")
					result({"message": "Incorrect password!"});
					return;
				}

			});
		} else{
			console.log("Model: User: signin: Error user does not exist. Please signup!")
			result({"message": "Error user does not exist. Please signup!"});
			return;
		};
	});
};
module.exports = User;