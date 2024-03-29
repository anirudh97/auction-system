const sql = require("./db.js");

const Bid = function(bid){
    this.email = bid.email;
    this.auctionId = bid.auctionId;
    this.bidTimestamp = bid.bidTimestamp;
    this.amount = bid.amount;
};

Bid.deleteAutoBid = (email, auctionId, result) => {
    console.log("Model: Bids: deleteAutoBid: Invoked !");

    sqlQuery = "DELETE FROM auto_bid WHERE email = " + sql.escape(email) + " AND auction_id = " + sql.escape(auctionId);
    console.log(sqlQuery)
    sql.query(sqlQuery, (err, res) => {
        if(err){
            console.log("Model: Bids: deleteAutoBid: some error occured: !", err);
			result({ "message": err }, null);
			return;
        }
        else{
            console.log("Model: Bids: deleteAutoBid: delete autobid");
            result(null,res);
        };
    });
}

Bid.postBid = (bid, result) => {
    // console.log("Model: Bids: postBid: Invoked !");
    // console.log(bid)
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
};

Bid.createAutoBid = (bid, result) => {
    console.log("Model: Bids: createAutoBid: Invoked !");
    sqlQuery = "INSERT INTO auto_bid (auction_id, email, upper_limit, bid_increment) VALUES(?, ?, ?, ?)";

    sql.query(sqlQuery, [bid.auctionId, bid.email, bid.upperLimit, bid.bidIncrement], (err, res) => {
        if (err) {
            console.log("Model: Bids: createAutoBid: Error !", err);
			result({ "message": err }, null);
			return;
        }
        else{
            result(null, { "message": "inserted new auto bid details", "data": res.insertId });
        }
    });
};

function executeQuery(d){
    return new Promise (function(resolve, reject){
        sqlQuery = "select * from bid WHERE auction_id = " + sql.escape(d.auction_id) + " AND amount >= " + sql.escape(d.upper_limit) + " ORDER BY bid_timestamp DESC LIMIT 1;";
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                return reject(err);
            }
            else{
                resolve(res);
            };
        });
    })
};

async function getMatches(resGetAutoBids){
    var matchAutoBid = []
    const promises = []
    for(var i = 0; i < resGetAutoBids.length; i++){
        promises.push(executeQuery(resGetAutoBids[i]));
    }
    matchAutoBid = await Promise.all(promises);

    return matchAutoBid;
};

Bid.checkUpperLimit = (email, result) => {
    console.log("Model: Bids: checkUpperLimit: Invoked !");
    sqlQueryGetAutobids = "SELECT * FROM auto_bid WHERE email = " + sql.escape(email);
    console.log(sqlQueryGetAutobids)
    sql.query(sqlQueryGetAutobids, (errGetAutoBids, resGetAutoBids) => {
        if(errGetAutoBids){
            console.log("Model: Bids: checkUpperLimit: some error occured: !", err);
			result({ "message": err }, null);
			return;
        }
        else{
            getMatches(resGetAutoBids).then((matchAutoBid) => {
                result(null, matchAutoBid);
            })
            .catch((err) => {
                console.log("Model: Bids: checkUpperLimit: some error occured: !", err);
                result({ "message": err }, null);
                return;
            })
        }
    })
};

Bid.postAutoBid = (email, result) => {
    // console.log("Model: Bids: postAutoBid: Invoked !");
    var datetime = new Date();
    currentDate = datetime.toISOString().slice(0,10);

    sqlQuery = "select auto_bid.auction_id, auction.bid_increment, bid.amount, bid.email AS bidder_email FROM auto_bid join bid using(auction_id) JOIN auction USING(auction_id) WHERE auto_bid.email = " + sql.escape(email) + " AND auto_bid.upper_limit >= bid.amount AND auction.closing_date > " + sql.escape(currentDate) + "ORDER BY bid.bid_timestamp desc limit 1;";
    sql.query(sqlQuery, (err, res) => {
        if(err){
            console.log("Model: Bids: postAutoBid: some error occured: !", err);
			result({ "message": err }, null);
			return;
        }
        else{
            // console.log("Model: Bids: postAutoBid: retreived autobid auction ids");

            result(null,{"res": res, "email": email});
        };
    });
};

module.exports = Bid;