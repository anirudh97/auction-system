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
            
            res.render('pages/watchlist', { "status": 200, "message": "Successfully retreived watchlist", "data": data});
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
            res.send(data);
        };
    });
};

