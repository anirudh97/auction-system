const Auction = require('../models/auctions.model.js');
const Items = require('../models/items.model.js');

exports.getAuction = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    }
    else{
        Auction.getAuction(req.params.auctionId, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Controller: Auctions: getAuction: Some error occured"
                });
            else
                console.log("Controller: Auctions: getAuction: Fetched Auction");
            
            if(data != null){
                auctions = {};
                already_seen_items = new Set();
                item_images = {};
                for (let i = 0; i < data.length; i++) {
                    imagePathClean = data[i].imagePath.split('public')[1];
                    if (data[i].item_id in item_images) {
                        item_images[data[i].item_id].push(imagePathClean)
                    } else {
                        item_images[data[i].item_id] = [imagePathClean]
                    };
                };
                for (let i = 0; i < data.length; i++) {
                    if (already_seen_items.has(data[i].item_id)) {
                        continue
                    } else {
                        auctions = {
                            "auctionId": data[i].auction_id,
                            "closingDate": data[i].closing_date,
                            "itemId": data[i].item_id,
                            "imagePaths": item_images[data[i].item_id],
                            "brand": data[i].brand,
                            "category": data[i].category,
                            "type": data[i].type,
                            "color": data[i].color,
                            "model": data[i].model,
                            "bidIncrement": data[i].bid_increment,
                            "amount": data[i].amount
                        };
        
                        already_seen_items.add(data[i].item_id);
                    };
                };

                console.log(auctions);
                res.render('pages/itemPage', { "status": 200, "message": "Successfully retreived auction", "data": auctions})
            }
            else {
                res.send([]);
            }
        })
    }
}
exports.getAuctions = (req, res) => {
    isWinner = req.query.isWinner;

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
        
            if(data != null){
                auctions = [];
                already_seen_items = new Set();
                item_images = {};
                for (let i = 0; i < data.length; i++) {
                    imagePathClean = data[i].imagePath.split('public')[1];
                    if (data[i].item_id in item_images) {
                        item_images[data[i].item_id].push(imagePathClean)
                    } else {
                        item_images[data[i].item_id] = [imagePathClean]
                    };
                };
                for (let i = 0; i < data.length; i++) {
                    if (already_seen_items.has(data[i].item_id)) {
                        continue
                    } else {
                        auctions.push({
                            "auctionId": data[i].auction_id,
                            "closingDate": data[i].closing_date,
                            "itemId": data[i].item_id,
                            "imagePaths": item_images[data[i].item_id],
                            "brand": data[i].brand,
                            "category": data[i].category,
                            "type": data[i].type
                        });
        
                        already_seen_items.add(data[i].item_id);
                    };
                };
                res.send(auctions);
            }
            else {
                res.send([]);
            }
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
                email: req.session.user,
                closingDate: req.body.closingDate,
                bidIncrement: req.body.bidIncrement,
                initialPrice: req.body.initialPrice,
                minimumPrice: req.body.minimumPrice,
                itemId: data.data,
                winner: "NA",
                finalPrice: 0
            });

            Auction.create(auction, (err, data) => {
                if (err) {
                    res.render('pages/createAuction', { "status": 500, "data": { "message": err.message } })
                }
                else {
                    console.log("Controller: Auction: create: Created Auction Successfully!")
                    req.session.alertData = {"message": "Auction created successfully", "alertType": "success"};
                    res.redirect('/home');
                };
            });
        }
    });

};