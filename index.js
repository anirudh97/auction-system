const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var usersRouter = require('./routes/users.route')
var itemsRouter = require('./routes/items.route')

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// Default route
app.get("/", (req, res) => {
  res.render('pages/home');
});

app.use("/", usersRouter)
app.use("/items", itemsRouter)

app.use(express.static(__dirname + "/public"));

// Server Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


