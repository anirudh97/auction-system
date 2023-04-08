const sql = require("./db.js");

const Bid = function(bid){
    this.email = bid.email;
    this.auctionId = bid.auctionId;
    this.bidTimestamp = bid.bidTimestamp;
    this.amount = bid.amount;
}

Bid.postBid = (bid, result) => {
    console.log("Model: Bids: postBid: Invoked !");
    sqlQuery = "INSERT INTO bid (auction_id, email, bid_timestamp, amount) VALUES(?, ?, ?, ?)";

    sql.query(sqlQuery, [bid.auctionId, bid.email, bid.bidTimestamp, bid.amount], (err, res) => {
        if (err) {
            console.log("Model: Bids: postBid: Error !", err);
			result({ "message": err }, null);
			return;
        }
        else{
            result(null, { "message": "inserted new bid details", "data": res.insertId });
        }
    });
}
module.exports = Bid;