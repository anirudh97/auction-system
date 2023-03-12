const sql = require("./db.js");


const Items = function (item) {
	this.brand = item.brand;
	this.color = item.color;
	this.type = item.type;
	this.category = item.category;
	this.model = item.model;
	this.imagePaths = item.imagePaths;
};

exports.getItems = (result) => {
	console.log("Model: Items: getItems: Invoked !")
	sqlQuery = "SELECT items.itemId, items.brand, items.color, items.model, items.type, items.category, itemImages.imagePath from items LEFT JOIN itemImages ON items.itemId = itemImages.itemId";

	sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Items: getItems: Error in getting Items !");
			result({ "message": err }, null);
			return;
		}

		result(null, res)

	});
};


Items.addItem = (newItem, result) => {
	console.log("Model: Items: addItem: Invoked !")

	console.log(newItem)
	sqlQueryItem = "INSERT INTO items(brand, model, color, type, category) VALUES(?, ?, ?, ?, ?)";

	sql.query(sqlQueryItem, [newItem.brand, newItem.model, newItem.color, newItem.type, newItem.category], (err, res) => {
		if (err) {
			console.log("Model: Items: addItem: Error !", err);
			result({ "meesage": err }, null);
			return;
		};
		console.log("Model: Items: addItem: Added New Item")

		sqlQueryImage = "INSERT INTO itemImages(itemId, imagePath) VALUES ?";
		itemImages = []

		for (let i in newItem.imagePaths) {
			itemImages.push([res.insertId, newItem.imagePaths[i]])
		}

		sql.query(sqlQueryImage, [itemImages], (imageErr, resImage) => {
			if (imageErr) {
				console.log("Model: Items: addItem: Error in insering image paths!", imageErr);
				result({ "meesage": imageErr }, null);
				return;
			};
			console.log("Model: Items: addItem: Added New Item image paths");
			result(null, { "message": "inserted new item and image paths" });
		});

	})
};

module.exports = Items;