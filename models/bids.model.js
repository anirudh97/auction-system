const sql = require("./db.js");

const Bid = function(bid){
    this.email = bid.email;
    this.auctionId = bid.auctionId;
    this.bidTimestamp = bid.bidTimestamp;
    this.amount = bid.amount;
};

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
    console.log("Model: Bids: postAutoBid: Invoked !");
    sqlQuery = "select auto_bid.auction_id from auto_bid join bid using(auction_id) where auto_bid.email = " + sql.escape(email) + " and auto_bid.upper_limit <= bid.amount order by bid.bid_timestamp desc limit 1;";
    sql.query(sqlQuery, (err, res) => {
        if(err){
            console.log("Model: Bids: postAutoBid: some error occured: !", err);
			result({ "message": err }, null);
			return;
        }
        else{
            console.log("Model: Bids: postAutoBid: retreived autobid auction ids");
            console.log(res);
            result(null,res);
        };
    });
};

module.exports = Bid;