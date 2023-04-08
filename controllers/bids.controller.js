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
