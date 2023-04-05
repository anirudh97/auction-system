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
}

Auction.getAuction = (auctionId, result) => {
    console.log("Model: Auctions: getAuction: Invoked !");
    sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)), bid_auction AS( select amount, auction_id FROM bid WHERE auction_id = " +  sql.escape(auctionId)+ " ORDER BY bid_timestamp DESC LIMIT 1) select auction_id, closing_date, bid_increment, auction.item_id, category, brand, type, color, model, imagePath, imageId, amount FROM auction JOIN item_images USING(item_id) JOIN bid_auction USING(auction_id) WHERE auction.auction_id = " + sql.escape(auctionId);
	sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Auction: getAuction: Error in getting Auction: ", err);
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
}
Auction.getAuctions = (isWinner,result) => {
	console.log("Model: Auctions: getAuctions: Invoked !");
    if (isWinner == "true"){
        sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)) select auction_id, closing_date, auction.item_id, category, brand, type, color, model, imagePath, imageId FROM auction JOIN item_images USING(item_id) ORDER BY auction.id;";
    }
    else{
        sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)) select auction_id, closing_date, auction.item_id, category, brand, type, color, model, imagePath, imageId FROM auction JOIN item_images ON auction.item_id = item_images.item_id WHERE auction.winner = 'NA'";
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
}


module.exports = Auction;
