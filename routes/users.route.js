const express = require('express');
const path = require('path');
const router = express.Router();
const users = require("../controllers/users.controller.js");

router.post('/signup', users.create)
router.post('/signin', users.signin)

router.get('/signup', (req, res) => {
	res.render('pages/signup');
});

router.get('/home', (req, res) => {
	res.render('pages/home', {data: {user: req.session.user}});
})

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
})
module.exports = router;

