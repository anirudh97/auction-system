const express = require('express');
const path = require('path');
const router = express.Router();
const users = require("../controllers/users.controller.js");

router.post('/signup', users.create)
router.post('/signin', users.signin)

router.get('/signup', (req, res) => {
	res.render('pages/signup');
});

module.exports = router;

