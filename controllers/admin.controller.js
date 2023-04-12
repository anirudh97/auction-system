const User = require('../models/users.model.js');
const Category = require('../models/category.model.js');

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