const sql = require("./db.js");

const Auction = function(auction){
    this.finalPrice = auction.finalPrice;
    this.closingDate = auction.closingDate;
    this.bidIncrement = auction.bidIncrement;
    this.initialPrice = auction.initialPrice;
    this.minimumPrice = auction.minimumPrice;
    this.winner = auction.winner;
    this.itemId = auction.itemId;
}

Auction.getAuctions = (isWinner,result) => {
	console.log("Model: Auctions: getAuctions: Invoked !");
    if (isWinner == "true"){
        sqlQuery = "SELECT auctions.auctionId, auctions.itemId, auctions.finalPrice, auctions.initialPrice, auctions.minimumPrice, auctions.bidIncrement, auctions.closingDate, auctions.winner, itemImages.imagePath FROM auctions LEFT JOIN itemImages ON auctions.itemId = itemImages.itemId ORDER BY auctions.itemId DESC";
    }
    else{
        sqlQuery = "SELECT auctions.auctionId, auctions.itemId, auctions.finalPrice, auctions.initialPrice, auctions.minimumPrice, auctions.bidIncrement, auctions.closingDate, auctions.winner, itemImages.imagePath FROM auctions LEFT JOIN itemImages ON auctions.itemId = itemImages.itemId WHERE auctions.winner != 'NA' ORDER BY auctions.itemId DESC";
    }
    
	sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Auction: getAuctions: Error in getting Auctions !");
			result({ "message": err }, null);
			return;
		}
		result(null, res)

	});
};

Auction.create = (auction, result) => {

    console.log("Model: Auctions: create: Invoked !");
    sqlQuery = "INSERT INTO auctions(itemId, finalPrice, initialPrice, minimumPrice, bidIncrement, closingDate, winner) VALUES(?, ?, ?, ?, ?, ?, ?)";

    console.log(auction);
    sql.query(sqlQuery, [auction.itemId, auction.finalPrice, auction.initialPrice, auction.minimumPrice, auction.bidIncrement, auction.closingDate, auction.winner], (err, res) => {
        if (err) {
            console.log("Model: Auctions: create: Error !", err);
			result({ "meesage": err }, null);
			return;
        }
        else {
            console.log("Model: Auctions: create: Added new auction");
            result(null, { "message": "inserted new auction", "data": res.insertId });
        };
    });
}


module.exports = Auction;
