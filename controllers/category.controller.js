const Category = require('../models/category.model.js');


exports.getCategory = (req, res) => {
    Category.getCategory((err, data) => {
        if (err) {
            res.render('pages/adminHome', { "status": 500, "data": { "message": err.message, "alertType": "danger" } })
        }
        else {
            console.log("Controller: Category: getCategory: retreived categories Successfully!")
            res.send(data);
        }
    });
};