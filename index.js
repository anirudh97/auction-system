const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var usersRouter = require('./routes/users.route')

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"))
});

app.use("/", usersRouter)



// Server Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


