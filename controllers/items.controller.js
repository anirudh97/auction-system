const Items = require('../models/items.model.js')

exports.getItems = (req, res) => {
	Items.getItems((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Controller: Items: getItems: Some error occured"
			});
		else
			console.log("Controller: Items: getItems: Fetched all Items")

		items = []
		already_seen_items = new Set();
		item_images = {}

		for (let i = 0; i < data.length; i++) {
			if (data[i].itemId in item_images) {
				item_images[data[i].itemId].push(data[i].imagePath)
			} else {
				item_images[data[i].itemId] = [data[i].imagePath]
			};
		};

		for (let i = 0; i < data.length; i++) {
			if (already_seen_items.has(data[i].itemId)) {
				continue
			} else {
				items.push({
					"itemId": data[i].itemId, "brand": data[i].brand, "color": data[i].color,
					"model": data[i].model, "type": data[i].type, "category": data[i].category,
					"imagePaths": item_images[data[i].itemId]
				});

				already_seen_items.add(data[i].itemId)
			};
		};

		res.send(data)
	});
};

exports.addItem = (req, res) => {
	if (!req.body) {
		res.send("None of the fields can be empty!");
	};

	paths = []
	for (let i = 0; i < req.files.length; i++) {
		paths.push(req.files[i].path)
	};

	const Item = new Items({
		model: req.body.model,
		color: req.body.color,
		type: req.body.type,
		category: req.body.category,
		brand: req.body.brand,
		imagePaths: paths
	});

	Items.addItem(Item, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Controller: Items: addItem: Error occured in adding item."
			});
		else
			console.log("Controller: Items: addItem: addItem Successful!")
		res.send(data)
	});
};