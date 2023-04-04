const sql = require("./db.js");


function Items (item) {
	this.brand = item.brand;
	this.color = item.color;
	this.type = item.type;
	this.category = item.category;
	this.model = item.model;
	this.imagePaths = item.imagePaths;
};

Items.getItems = (result) => {
	console.log("Model: Items: getItems: Invoked !")
	sqlQuery = "SELECT item.item_id, items.brand, item.color, item.model, item.type, item.category, itemImages.imagePath FROM item LEFT JOIN itemImages ON item.item_id = itemImages.item_id";

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
	console.log("Model: Items: addItem: Invoked !");
	sqlQueryItem = "INSERT INTO item (brand, model, color, type, category) VALUES(?, ?, ?, ?, ?)";

	sql.query(sqlQueryItem, [newItem.brand, newItem.model, newItem.color, newItem.type, newItem.category], (err, res) => {
		if (err) {
			console.log("Model: Items: addItem: Error !", err);
			result({ "meesage": err }, null);
			return;
		};
		console.log("Model: Items: addItem: Added New Item")

		sqlQueryImage = "INSERT INTO itemImages(item_id, imagePath) VALUES ?";
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
			lastInsertedIdQuery = "SELECT item_id FROM item WHERE item_id=(SELECT LAST_INSERT_ID())";
			result(null, { "message": "inserted new item and image paths", "data": res.insertId });
		});

	})
};

module.exports = Items;