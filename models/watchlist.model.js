const sql = require("./db.js");

const Watchlist = function(watchlist){
    this.email = watchlist.email;
    this.category = watchlist.category;
    this.brand = watchlist.brand;
    this.color = watchlist.color;
};

Watchlist.getWatchlist = (email, result) => {
    console.log("Model: Watchlist: getWatchlist: Invoked !");
    sqlQuery = "SELECT watchlistId, email, category, brand, color FROM watchlist WHERE email = " + sql.escape(email);
    sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("Model: Watchlist: getWatchlist: Some error occured !", err);
			result({ "message": err }, null);
			return;
		};
		result(null, res);
	});
};

Watchlist.addToWatchlist = (watchlist, result) => {
    console.log("Model: Watchlist: addToWatchlist: Invoked !");
    sqlQuery = "INSERT INTO watchlist (email, category, brand, color) VALUES(?, ?, ?, ?)";
    sql.query(sqlQuery, [watchlist.email, watchlist.category, watchlist.type, watchlist.brand, watchlist.color], (err, res) => {
		if (err) {
			console.log("Model: Watchlist: addToWatchlist: Some error occured !", err);
			result({ "message": err }, null);
			return;
		};
		result(null, res);
	});
};

Watchlist.trackWatchlist = (email, result) => {
    console.log("Model: Watchlist: trackWatchlist: Invoked !");
    sqlQueryGetWatchlist = "SELECT watchlistId, email, category, brand, color FROM watchlist WHERE email = " + sql.escape(email);
    sql.query(sqlQueryGetWatchlist, (errGetWatchlist, resGetWatchlist) => {
		if (err) {
			console.log("Model: Watchlist: trackWatchlist: Some error occured !", err);
			result({ "message": err }, null);
			return;
		}
		else{
            var matchWatchlist = []
            for(var i = 0; i < resGetWatchlist.length ; i++){
                sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)) select auction_id, closing_date, auction.item_id, category, brand, type, color, model, imagePath, imageId FROM auction JOIN item_images ON auction.item_id = item_images.item_id WHERE auction.winner = 'NA'" +  " AND category = " + sql.escape(resGetWatchlist[i].category) + " AND brand = " + sql.escape(resGetWatchlist[i].brand) + " AND color = " + sql.escape(resGetWatchlist[i].color);
                sql.query(sqlQuery, (err, res) => {
                    if (err) {
                        console.log("Model: Watchlist: getWatchlist: Some error occured !", err);
                        result({ "message": err }, null);
                        return;
                    }
                    else{
                        matchWatchlist.concat(res);
                    };
                });
            };
            result(null, matchWatchlist);
        };
	});
}