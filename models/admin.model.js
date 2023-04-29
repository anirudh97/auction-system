const sql = require("./db.js");

exports.categorySale = (result) => {
    console.log("Model: Admin: categorySale: Invoked !");
    sqlQuery = "SELECT category, sum(final_price) AS total_item_sale FROM auction JOIN item USING(item_id) GROUP BY category;";
    sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Admin: categorySale: Error in getting report: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)
	});
};

exports.userEarnings = (result) => {
    console.log("Model: Admin: userEarnings: Invoked !");
    sqlQuery = "Select email, sum(final_price) as total_user_earnings From auction Group by email Order by sum(final_price) DESC;";
    sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Admin: userEarnings: Error in getting report: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
};

exports.siteWideTotalSales = (result) => {
    console.log("Model: Admin: siteWideTotalSales: Invoked !");
    sqlQuery = "Select sum(final_price) as total_sales From auction;";
    sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Admin: siteWideTotalSales: Error in getting report: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
};

exports.bestSellingItems = (result) => {
    console.log("Model: Admin: bestSellingItems: Invoked !");
    sqlQuery = "Select category, brand, model, final_price - initial_price as profit From auction Join item using(item_id) where final_price - initial_price > 0 Order by final_price - initial_price DESC";
    sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Admin: bestSellingItems: Error in getting report: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
};

exports.userWithMostSpending = (result) => {
    console.log("Model: Admin: userWithMostSpending: Invoked !");
    sqlQuery = "select winner, sum(final_price) AS sum_final_price FROM auction WHERE winner not in ('NA', 'NW') group by winner order by sum(final_price) desc;"
    sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Admin: userWithMostSpending: Error in getting report: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
};