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

app.use(session({ secret: 'session secret', name: 'sessionId', saveUninitialized: false, resave: false }));
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



// Server Listen
app.listen(port, "127.0.0.1", () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});

Auction.updateAuctions(async (err, data) => {
  if (err) {
    console.log("error in update auctions: ", err)
    exit(1);
  }
});
setInterval(async () => {
  Auction.updateAuctions((err, data) => {
    if (err) {
      console.log("error in update auctions: ", err)
      exit(1);
    }
  });
}, 10000)

User.getUsers( async (err, users) => {
  if (err) {
    console.log("Error getting users: ", err)
  } else {
    for (var i = 0; i < users.length; i++) {
      var user = users[i].email;
      Bids.postAutoBid(user, (err, postAutoBidData) => {
        if (err) {
          console.log("Error getting postAutoBid data: ", err)
          exit(1)
        } else {
          for (var j = 0; j < postAutoBidData.res.length; j++) {
            var timestamp = new Date();
            timestamp = timestamp.toISOString().split('T')[0]
            if (postAutoBidData.res[j].bidder_email != postAutoBidData.email) {
              Bids.postBid({ "auctionId": postAutoBidData.res[j].auction_id, "email": postAutoBidData.email, "bidTimestamp": timestamp, "amount": parseInt(postAutoBidData.res[j].amount) + parseInt(postAutoBidData.res[j].bid_increment) }, (err, postBidData) => {
                if (err) {
                  console.log("Error in posting bid: ", err);
                  exit(1)
                }
              })
            }
          }
        }
      })
    }
  };
});

setInterval( async () => {
  User.getUsers( async (err, users) => {
    if (err) {
      console.log("Error getting users: ", err)
    } else {
      for (var i = 0; i < users.length; i++) {
        var user = users[i].email;
        Bids.postAutoBid(user, (err, postAutoBidData) => {
          if (err) {
            console.log("Error getting postAutoBid data: ", err)
            exit(1)
          } else {
            for (var j = 0; j < postAutoBidData.res.length; j++) {
              var timestamp = new Date();
              timestamp = timestamp.toISOString().split('T')[0]
              if (postAutoBidData.res[j].bidder_email != postAutoBidData.email) {
                Bids.postBid({ "auctionId": postAutoBidData.res[j].auction_id, "email": postAutoBidData.email, "bidTimestamp": timestamp, "amount": parseInt(postAutoBidData.res[j].amount) + parseInt(postAutoBidData.res[j].bid_increment) }, (err, postBidData) => {
                  if (err) {
                    console.log("Error in posting bid: ", err);
                    exit(1)
                  }
                })
              }
            }
          }
        })
      }
    };
  });
  }, 10000)

