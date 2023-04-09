const Bids = require('../models/bids.model.js')

exports.postBid = (req, res) => {
    console.log("Controller: Bids: postBid: postBid invoked !");
    var dateTime = new Date();

    const bid = new Bids({
        auctionId: req.params.auctionId,
        email: req.session.user,
        bidTimestamp: dateTime,
        amount: parseInt(req.body.amount) + parseInt(req.body.bidIncrement)
    })
    Bids.postBid(bid, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Bids: postBid: Error occured in posting bid."
            });
        }
        else{
            console.log("Controller: Bids: postBid: Posted bid Successfully!")
            req.session.alertData = {"message": "Bid posted successfully", "alertType": "success"};
            res.redirect('/home');
        };

    })
};


exports.createAutoBid = (req, res) => {
    console.log("Controller: Bids: createAutoBid: createAutoBid invoked !");

    const autoBid = {
        auctionId: req.params.auctionId,
        email: req.session.user,
        bidIncrement: req.body.bidIncrement,
        upperLimit: req.body.upperLimit
    }
    Bids.createAutoBid(autoBid, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Bids: createAutoBid: Error occured in enabling auto bid."
            });
        }
        else{
            console.log("Controller: Bids: createAutoBid: Enabled auto bid Successfully!")
            req.session.alertData = {"message": "Auto Bid enabled successfully", "alertType": "success"};
            res.redirect('/home');
        };

    })
};

exports.checkUpperLimit = (req, res) => {
    console.log("Controller: Bids: checkUpperLimit: checkUpperLimit invoked !");
    Bids.checkUpperLimit(req.session.user, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Bids: checkUpperLimit: Error occured in checking upper limit"
            });
        }
        else{
            console.log("Controller: Bids: checkUpperLimit: Check upper limit for autobid Successful!");
            var responsePayload = {}
            if(data.length > 0){
                responsePayload = {"data": data, "upperLimitTriggered": true};
            }
            else{
                responsePayload = {"data": data, "upperLimitTriggered": false};
            }
            res.send(responsePayload);
        };

    })
};

exports.postAutoBid = (req, res) => {
    console.log("Controller: Bids: postAutoBid: postAutoBid invoked !");
    Bids.postAutoBid(req.session.user, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Bids: postAutoBid: Error occured."
            });
        }
        else {
            console.log("Controller: Bids: postAutoBid: retreived auction ids for autobid Successful!");
            res.send(data);
        };

    });
};