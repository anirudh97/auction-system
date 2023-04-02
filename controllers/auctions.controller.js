const Auction = require('../models/auctions.model.js');
const Items = require('../models/items.model.js');

exports.getAuctions = (req, res) => {
    isWinner = req.query.isWinner;
    console.log(typeof(isWinner));

    if (req.session.loggedIn != true){
        res.redirect("/");
    }
    else if(isWinner != "false" && isWinner != "true"){
        res.status(400).send({"message": "Invalid query parameters"});
    }
    else {
        Auction.getAuctions(isWinner, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Controller: Auctions: getAuctions: Some error occured"
                });
            else
                console.log("Controller: Auctions: getAuctions: Fetched all Auctions");
            
            auctions = []
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
                    auctions.push({
                        "auctionId": data[i].auctionId, "finalPrice": data[i].finalPrice, "closingDate": data[i].closingDate,
                        "bidIncrement": data[i].bidIncrement,
                        "itemId": data[i].itemId,
                        "imagePaths": item_images[data[i].itemId]
                    });
    
                    already_seen_items.add(data[i].itemId)
                };
            };
            res.send(auctions);
        })
    };
};

exports.create = (req, res) => {

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
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Auctions: addItem: Error occured in adding item."
            });
        }
        else {
            console.log("Controller: Auctions: addItem: addItem Successful!");
            const auction = new Auction({
                closingDate: req.body.closingDate,
                bidIncrement: req.body.bidIncrement,
                initialPrice: req.body.initialPrice,
                minimumPrice: req.body.minimumPrice,
                itemId: data.data,
                winner: "NA",
                finalPrice: 0.0
            });

            Auction.create(auction, (err, data) => {
                if (err) {
                    res.render('pages/signup', { "status": 500, "data": { "message": err.message } })
                }
                else {
                    console.log("Controller: Auction: create: Created Auction Successfully!")
                    res.redirect('/home');
                };
            });
        }
    });

};