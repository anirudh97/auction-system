const sql = require("./db.js");

const Auction = function(auction){
    this.finalPrice = auction.finalPrice;
    this.closingDate = auction.closingDate;
    this.bidIncrement = auction.bidIncrement;
    this.initialPrice = auction.initialPrice;
    this.minimumPrice = auction.minimumPrice;
    this.winner = auction.winner;
    this.itemId = auction.itemId;
    this.email = auction.email;
};


Auction.search = (email, searchData, result) => {
	console.log("Model: Auctions: search: Invoked !");

    sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)) select auction_id, closing_date, auction.item_id, category, brand, type, color, model, imagePath, imageId, auction.email FROM auction JOIN item_images ON auction.item_id = item_images.item_id WHERE auction.winner = 'NA' AND auction.email != " + sql.escape(email) + " AND item_images.brand = " + sql.escape(searchData.brand) + " AND item_images.category = " + sql.escape(searchData.category) + " AND item_images.color = " + sql.escape(searchData.color);
    
	sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Auction: search: Error in getting search auctions: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
};


function executeQuery(d){
    return new Promise (function(resolve, reject){
        sqlQuery = "UPDATE auction SET winner = " + sql.escape(d.winner) + " ,final_price = " +  sql.escape(d.finalPrice) + " WHERE auction_id = " + sql.escape(d.auctionId);
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

async function updateAuctionsTable(updateAuctionData){
    var updateAuctions = []
    const promises = []
    for(var i = 0; i < updateAuctionData.length; i++){
        promises.push(executeQuery(updateAuctionData[i]));
    }
    updateAuctions = await Promise.all(promises);

    return updateAuctions;
};

Auction.getDetails = (result) => {
    console.log("Model: Auctions: getDetails: Invoked !");
    sqlQuery = "SELECT auction_id, bid_id, auction.email AS auction_email, category, model, bid.email AS bidder_email FROM auction JOIN bid USING(auction_id) JOIN item USING(item_id)";
    sql.query(sqlQuery, (err, res) => {
        if(err){
            console.log("Model: Auctions: getDetails: Some error occured!");
            result({ "message": err }, null);
			return;
        } else{
            console.log("Model: Auctions: getDetails: got all auction details");
            result(null, res);
        };
    });
};

Auction.deleteBid = (auctionId, bidId, result) => {
    console.log("Model: Auctions: deleteBid: Invoked !");
    sqlQuery = "DELETE FROM bid WHERE auction_id = " + sql.escape(auctionId) + " AND bid_id = " + sql.escape(bidId);
    sql.query(sqlQuery, (err, res) => {
        if(err){
            console.log("Model: Auctions: deleteBid: Some error occured!");
            result({ "message": err }, null);
			return;
        } else{
            console.log("Model: Auctions: deleteBid: deleted bid");
            result(null, res);
        };
    });
};

Auction.deleteAuction = (auctionId, result) => {
    console.log("Model: Auctions: deleteBid: Invoked !");
    sqlQuery = "DELETE FROM auction WHERE auction_id = " + sql.escape(auctionId);
    sql.query(sqlQuery, (err, res) => {
        if(err){
            console.log("Model: Auctions: deleteAuction: Some error occured!");
            result({ "message": err }, null);
			return;
        } else {
            console.log("Model: Auctions: deleteAuction: deleted auction");
            result(null, res);
        };
    });
};

Auction.updateAuctions = (email, result) => {
    console.log("Model: Auctions: updateAuctions: Invoked !");
    var datetime = new Date();
    currentDate = datetime.toISOString().slice(0,10);

    sqlQueryExpiredAuctions = "With cte as (Select auction_id, bid.amount,bid_timestamp, minimum_price, bid.email AS bid_email, auction.email AS auction_email, dense_rank() OVER ( partition by AUCTION_ID order by bid_timestamp desc ) AS RNK From auction Join bid USING(auction_id) WHERE closing_date = " + sql.escape(currentDate) + ") SELECT * FROM cte WHERE rnk = 1;"
    console.log(sqlQueryExpiredAuctions);
    sql.query(sqlQueryExpiredAuctions, (errExpiredAuctions, resExpiredAuctions) => {
        if (errExpiredAuctions){
            console.log("Model: Auctions: updateAuctions: Error in getting expired auctions !");
            result({ "message": errExpiredAuctions }, null);
			return;
        } else{
            if (resExpiredAuctions.length > 0){
                var updateAuctionData = []
                var winner = "";
                var finalPrice = 0;

                for (var i = 0; i < resExpiredAuctions.length; i++){
                    if (resExpiredAuctions[i].amount >= resExpiredAuctions[i].minimum_price && resExpiredAuctions[i].auction_email != resExpiredAuctions[i].bid_email){
                        winner = resExpiredAuctions[i].bid_email;
                        finalPrice = resExpiredAuctions[i].amount;
                    } else{
                        winner = "NW";
                    }
                    updateAuctionData.push({
                        "winner": winner,
                        "finalPrice": finalPrice,
                        "auctionId": resExpiredAuctions[i].auction_id
                    });
                }

                updateAuctionsTable(updateAuctionData).then((updateAuctions) => {
                    console.log("Model: Auctions: updateAuctions: Updated auctions !");
                    result(null, {"message": "Updated Auctions"});
                })
                .catch((err) => {
                    console.log("Model: Auctions: updateAuctions: some error occured: !", err);
                    result({ "message": err }, null);
                    return;
                })
            } else {
                result(null, []);
            }
        };
    });

};
Auction.getMyAuctions = (email, result) => {
    console.log("Model: Auctions: getMyAuctions: Invoked !");
    sqlQueryCreatedAuction = "SELECT category, type, brand, auction_id FROM item JOIN auction USING(item_id) WHERE email = " + sql.escape(email);
    sql.query(sqlQueryCreatedAuction, (errCreatedAuction, resCreatedAuction) => {
		if (errCreatedAuction) {
			console.log("Model: Auction: getMyAuctions: Error in getting My Auctions: ", errCreatedAuction);
			result({ "message": errCreatedAuction }, null);
			return;
		}
        sqlQueryBidAuction = "SELECT DISTINCT(auction_id), category, type, brand FROM item JOIN auction USING(item_id) JOIN bid USING(auction_id) Where bid.email = " + sql.escape(email);
        sql.query(sqlQueryBidAuction, (errBidAuction, resBidAuction) => {
            if (errBidAuction) {
                console.log("Model: Auction: getMyAuctions: Error in getting My Auctions: ", errBidAuction);
                result({ "message": errBidAuction }, null);
                return;
            } else{
                result(null, {"createdAuction": resCreatedAuction, "bidAuction": resBidAuction});
            };
        });
	});

};
Auction.getAuction = (auctionId, email, result) => {
    console.log("Model: Auctions: getAuction: Invoked !");
    sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)), bid_auction AS( select amount, auction_id FROM bid WHERE auction_id = " +  sql.escape(auctionId)+ " ORDER BY bid_timestamp DESC LIMIT 1) select auction_id, closing_date, bid_increment, auction.item_id, category, brand, type, color, model, imagePath, imageId, amount, auction.email, auction.winner, auction.final_price FROM auction JOIN item_images USING(item_id) JOIN bid_auction USING(auction_id) WHERE auction.auction_id = " + sql.escape(auctionId);
	console.log(sqlQuery);
    sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Auction: getAuction: Error in getting Auction: ", err);
			result({ "message": err }, null);
			return;
		} else{
            sqlQueryAutoBid = "SELECT * FROM auto_bid WHERE auction_id = " + sql.escape(auctionId) + " AND email = " + sql.escape(email);
            sql.query(sqlQueryAutoBid, (errAutoBid, resAutoBid) => {
                if(errAutoBid){
                    console.log("Model: Auction: getAuction: Error in getting Auto bid: ", err);
                    result({ "message": err }, null);
                    return;
                }
                else{
                    if (resAutoBid.length > 0){
                        result(null, {"auctionDetails": res, "isAutoBid": true});
                    }else{
                        result(null, {"auctionDetails": res, "isAutoBid": false});
                    };
                   
                };  
            })
        };
	});
};
Auction.getAuctions = (isWinner, email,result) => {
	console.log("Model: Auctions: getAuctions: Invoked !");
    if (isWinner == "true"){
        sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)) select auction_id, closing_date, auction.item_id, category, brand, type, color, model, imagePath, imageId, auction.email FROM auction JOIN item_images USING(item_id) ORDER BY auction.id;";
    }
    else{
        sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)) select auction_id, closing_date, auction.item_id, category, brand, type, color, model, imagePath, imageId, auction.email FROM auction JOIN item_images ON auction.item_id = item_images.item_id WHERE auction.winner = 'NA' AND auction.email != " + sql.escape(email);
    }
    
	sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Auction: getAuctions: Error in getting Auctions: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
};

Auction.create = (auction, result) => {

    console.log("Model: Auctions: create: Invoked !");
    sqlQuery = "INSERT INTO auction (item_id, email, final_price, initial_price, minimum_price, bid_increment, closing_date, winner) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

    sql.query(sqlQuery, [auction.itemId, auction.email, auction.finalPrice, auction.initialPrice, auction.minimumPrice, auction.bidIncrement, auction.closingDate, auction.winner], (err, res) => {
        if (err) {
            console.log("Model: Auctions: create: Error !", err);
			result({ "message": err }, null);
			return;
        }
        else {
            sqlQueryBid = "INSERT INTO bid(auction_id, email, bid_timestamp, amount) VALUES(?,?,?,?)";
            var timestamp = new Date();

            sql.query(sqlQueryBid, [res.insertId, auction.email, timestamp, auction.initialPrice], (bidErr, bidRes) => {
                if (bidErr) {
                    console.log("Model: Auctions: create: Bid Error !", err);
                    result({ "message": err }, null);
                    return;
                }
                else{
                    console.log("Model: Auctions: create: Added new auction");
                    result(null, { "message": "inserted new auction", "data": res.insertId });
                };
            })
        };
    });
};


module.exports = Auction;