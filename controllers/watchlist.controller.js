const Watchlist = require('../models/watchlist.model.js');


exports.getWatchlist = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    }
    else{
        Watchlist.getWatchlist(req.session.user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Controller: Watchlist: getWatchlist: Some error occured"
                });
            else
                console.log("Controller: Watchlist: getWatchlist: Fetched watchlist");
            res.render('pages/watchlist', { "status": 200, "message": "Successfully retreived watchlist", "data": {"data": data, "user": req.session.user }});
        });
    }
};

exports.addToWatchlist = (req, res) => {
    const watchlist = new Watchlist({
        email : req.session.user,
        category : req.body.category,
        brand : req.body.brand,
        color : req.body.color,
    });
    Watchlist.addToWatchlist(watchlist, (err, data) => {
        if (err) {
            res.render('pages/home', { "status": 500, "data": { "message": err.message} })
        }

        else {
            console.log("Controller: Watchlist: addToWatchlist: Watchlist Created Successfully!")
            res.redirect("/watchlist");
        }
    });
}

exports.trackWatchlist = (req, res) => {
    Watchlist.trackWatchlist(req.session.user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Controller: Watchlist: getWatchlist: Some error occured"
            });
        else{
            console.log("Controller: Watchlist: trackWatchlist: Fetched watchlist match");
            allData = []
            for (var i = 0; i<data.length; i++){
                if (data[i].length == 0){
                    continue
                }
                else{
                    for(var j = 0; j<data[i].length; j++){
                        allData.push(data[i][j]);
                    }
                };
            }

            auctions = [];
            already_seen_items = new Set();
            item_images = {};
            for (let i = 0; i < allData.length; i++) {
                imagePathClean = allData[i].imagePath.split('public')[1];
                if (allData[i].item_id in item_images) {
                    item_images[allData[i].item_id].push(imagePathClean)
                } else {
                    item_images[allData[i].item_id] = [imagePathClean]
                };
            };
            for (let i = 0; i < allData.length; i++) {
                if (already_seen_items.has(allData[i].item_id)) {
                    continue
                } else {
                    auctions.push(allData[i]);
                    already_seen_items.add(allData[i].item_id);
                };
            };

            res.send(auctions);
        };
    });
};

