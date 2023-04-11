const sql = require("./db.js")


const Category = function (category) {
	this.name = category.name;
}

Category.addCategory = (category, result) => {
    console.log("Model: Category: addCategory Invoked");
    sqlQuery = "INSERT INTO category(name) VALUES(?)";

    sql.query(sqlQuery, [category.name], (err, res) => {
        if (err) {
			console.log("Model: Category: addCategory: Error !: ", err)
			result({ "message": err });
		}else{
            console.log("Model: Category: addCategory: Successful ");
            result(null, { id: res.insertId });
        }
    })
};

Category.getCategory = (result) => {
    console.log("Model: Category: addCategory Invoked");
    sqlQuery = "SELECT * from category";

    sql.query(sqlQuery, (err, res) => {
        if (err) {
			console.log("Model: Category: getCategory: Error !: ", err)
			result({ "message": err });
		}else{
            console.log("Model: Category: getCategory: Successful ");
            result(null, res);
        }
    })
};

module.exports = Category;