const User = require('../models/users.model.js');
const Category = require('../models/category.model.js');
const Admin = require('../models/admin.model');

exports.categorySale = (req, res) => {
	Admin.categorySale((err, data) => {
		if (err) {
			res.status(500).send({
                message:
                    err.message || "Controller: Admin: categorySale: Error occured."
            });
		}
		else {
			console.log("Controller: Admin: categorySale: retreived report Successfully!")
			res.render('pages/categoryWiseSales.ejs', {"data": data});
		}
	});
};

exports.userEarnings = (req, res) => {
	Admin.userEarnings((err, data) => {
		if (err) {
			res.status(500).send({
                message:
                    err.message || "Controller: Admin: userEarnings: Error occured."
            });
		}
		else {
			console.log("Controller: Admin: userEarnings: retreived report Successfully!")
			res.render('pages/userEarnings', {"data": data});
		}
	});
};

exports.siteWideTotalSales = (req, res) => {
	Admin.siteWideTotalSales((err, data) => {
		if (err) {
			res.status(500).send({
                message:
                    err.message || "Controller: Admin: bestSellingItems: Error occured."
            });
		}
		else {
			console.log("Controller: Admin: siteWideTotalSales: retreived report Successfully!")
			res.render('pages/siteWideTotalSales', {"data": data});
		}
	});
};

exports.bestSellingItems = (req, res) => {
	Admin.bestSellingItems((err, data) => {
		if (err) {
			res.status(500).send({
                message:
                    err.message || "Controller: Admin: bestSellingItems: Error occured."
            });
		}
		else {
			console.log("Controller: Admin: bestSellingItems: retreived report Successfully!")
			res.render('pages/bestSellingItems', {"data": data});
		}
	});
};
exports.userWithMostSpending = (req, res) => {
	Admin.userWithMostSpending((err, data) => {
		if (err) {
			res.status(500).send({
                message:
                    err.message || "Controller: Admin: userWithMostSpending: Error occured."
            });
		}
		else {
			console.log("Controller: Admin: userWithMostSpending: retreived report Successfully!")
			res.render('pages/userWithMostSpending', {"data": data});
		}
	});
};

exports.createCustRep = (req, res) => {
	if (!req.body) {
		res.render('pages/signup', { "status": 400, "data": { "message": "Values cannot be empty!", "alertType": "danger" } });
	}
	else {
		const user = new User({
			password: req.body.password,
			email: req.body.email,
			type: "custRep"
		});

		User.create(user, (err, data) => {
			if (err) {
				res.render('pages/adminHome', { "status": 500, "data": { "message": err.message, "alertType": "danger" } })
			}
			else {
				console.log("Controller: Admin: createCustRep: Created Customer rep Successfully!")
				// res.render('pages/adminHome', { "status": 201, "data": { "message": "Customer Rep Account succesfully created!", "alertType": "success" } });
                req.session.alertData = {"message": "Customer Rep Account succesfully created!", "alertType": "success"};
                res.redirect('/adminHome');
			}
		});
	};
};

exports.addCategory = (req, res) => {
    const category = new Category({
        name: req.body.categoryName
    })
    Category.addCategory(category, (err, data) => {
        if (err) {
            res.render('pages/adminHome', { "status": 500, "data": { "message": err.message, "alertType": "danger" } })
        }
        else {
            console.log("Controller: Admin: addCategory: Created category Successfully!")
            // res.render('pages/adminHome', { "status": 201, "data": { "message": "Category succesfully created!", "alertType": "success" } });
            req.session.alertData = {"message": "Category succesfully created!", "alertType": "success"};
            res.redirect('/adminHome');
        }
    })
};