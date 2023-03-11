const express = require('express');
const path = require('path');
const router = express.Router();
const users = require("../controllers/users.controller.js");

router.post('/signup', users.create)
router.post('/signin', users.signin)

router.get('/signup', (req, res) => {
	res.sendFile(path.join(__dirname, "../views/signup.html"))
});

module.exports = router;

