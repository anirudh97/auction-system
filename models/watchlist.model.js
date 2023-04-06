const sql = require("./db.js");
var async = require('async');

const Watchlist = function(watchlist){
    this.email = watchlist.email;
    this.category = watchlist.category;
    this.brand = watchlist.brand;
    this.color = watchlist.color;
};

Watchlist.getWatchlist = (email, result) => {
    console.log("Model: Watchlist: getWatchlist: Invoked !");
    sqlQuery = "SELECT watchlist_id, email, category, brand, color FROM watchlist WHERE email = " + sql.escape(email);
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
    sql.query(sqlQuery, [watchlist.email, watchlist.category, watchlist.brand, watchlist.color], (err, res) => {
		if (err) {
			console.log("Model: Watchlist: addToWatchlist: Some error occured !", err);
			result({ "message": err }, null);
			return;
		};
		result(null, res);
	});
};

function executeQuery(d, email){
    return new Promise (function(resolve, reject){
        sqlQuery = "WITH item_images AS( select item.item_id AS item_id, category, brand, type, color, model, imagePath, imageId FROM item join itemImages USING (item_id)) select auction_id, closing_date, auction.item_id, category, brand, type, color, model, imagePath, imageId, auction.email FROM auction JOIN item_images ON auction.item_id = item_images.item_id WHERE auction.winner = 'NA'" +  " AND auction.email != " + sql.escape(email) + " AND category = " + sql.escape(d.category) + " AND brand = " + sql.escape(d.brand) + " AND color = " + sql.escape(d.color);
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                return reject(err);
            }
            else{
                resolve(res);
            };
        });
    })
}

async function getMatches(resGetWatchlist, email){
    var matchWatchlist = []
    const promises = []
    for(var i = 0; i < resGetWatchlist.length; i++){
        promises.push(executeQuery(resGetWatchlist[i], email));
    }
    matchWatchlist = await Promise.all(promises);
    // console.log(matchWatchlist);
    return matchWatchlist;
}
Watchlist.trackWatchlist = (email, result) => {
    console.log("Model: Watchlist: trackWatchlist: Invoked !");
    sqlQueryGetWatchlist = "SELECT watchlist_id, email, category, brand, color FROM watchlist WHERE email = " + sql.escape(email);
    sql.query(sqlQueryGetWatchlist, (errGetWatchlist, resGetWatchlist) => {
		if (errGetWatchlist) {
			console.log("Model: Watchlist: trackWatchlist: Some error occured !", err);
			result({ "message": err }, null);
			return;
		}
		else{
            getMatches(resGetWatchlist, email).then((matchWatchlist) => {
                result(null, matchWatchlist);
            })
            .catch((err) => {
                console.log("Model: Watchlist:trackWatchlist: Some error occured !", err);
                result({ "message": err }, null);
                return;
            })
        };
	});
}
module.exports = Watchlist;