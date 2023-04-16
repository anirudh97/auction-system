const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const Bids = require('./models/bids.model.js');
const { exit } = require('process');
const User = require('./models/users.model');
const Auction = require('./models/auctions.model');

var bidsRouter = require('./routes/bids.route');
var adminRouter = require('./routes/admin.route');
var usersRouter = require('./routes/users.route');
var itemsRouter = require('./routes/items.route');
var categoryRouter = require('./routes/category.route');
var auctionsRouter = require('./routes/auctions.route');
var watchlistRouter = require('./routes/watchlist.route');
var questionsRouter = require('./routes/questions.route');
var customerRepRouter = require('./routes/customerRep.route');


const app = express();
const port = 3000;

app.use(session({secret: 'session secret', name: 'sessionId', saveUninitialized: false, resave: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Default route
app.get("/", (req, res) => {
  res.render('pages/index');
});

app.use("/", usersRouter);
app.use("/bids", bidsRouter);
app.use("/admin", adminRouter);
app.use("/items", itemsRouter);
app.use("/category", categoryRouter);
app.use("/auctions", auctionsRouter);
app.use("/watchlist", watchlistRouter);
app.use("/questions", questionsRouter);
app.use("/customerRep", customerRepRouter);


app.use(express.static(__dirname + "/public"));




// User.getUsers((err, users) => {
//     if(err){
//       console.log("Error getting users: ", err)
//     } else {
//       for (var i = 0; i < users.length; i++){
//         var user = users[i].email;
//         Bids.postAutoBid(users[i].email, (err, postAutoBidData) => {
//           if(err){
//             console.log("Error getting postAutoBid data: ", err)
//             exit(1)
//           } else{
//             for(var j = 0; j < postAutoBidData.length; j++){
//               var timestamp = new Date();
//               if(postAutoBidData[j].bidder_email != user){
//                 Bids.postBid({"auctionId": postAutoBidData[j].auction_id, "email": user, "bidTimestamp": timestamp, "amount": parseInt(postAutoBidData[j].amount) + parseInt(postAutoBidData[j].bid_increment)}, (err, postBidData) => {
//                   if(err){
//                     console.log("Error in posting bid: ", err);
//                     exit(1)
//                   }
//                 })
//               }
//             }
//           }
//         })
//       }
//     };
// });

// Auction.updateAuctions((err, data) => {
//   if(err){
//     console.log("error in update auctions: ", err)
//     exit(1);
//   }
// });
// Server Listen
app.listen(port, "127.0.0.1", () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});


