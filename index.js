const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

var bidsRouter = require('./routes/bids.route');
var adminRouter = require('./routes/admin.route');
var usersRouter = require('./routes/users.route');
var itemsRouter = require('./routes/items.route');
var categoryRouter = require('./routes/category.route');
var auctionsRouter = require('./routes/auctions.route');
var watchlistRouter = require('./routes/watchlist.route');
var questionsRouter = require('./routes/questions.route');

const app = express();
const port = 3000;

app.use(session({secret: 'session secret', name: 'sessionId', saveUninitialized: false, resave: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Default route
app.get("/", (req, res) => {
  res.render('pages/customerRepInbox');
});

app.use("/", usersRouter);
app.use("/bids", bidsRouter);
app.use("/admin", adminRouter);
app.use("/items", itemsRouter);
app.use("/category", categoryRouter);
app.use("/auctions", auctionsRouter);
app.use("/watchlist", watchlistRouter);
app.use("/questions", questionsRouter);


app.use(express.static(__dirname + "/public"));

// Server Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


