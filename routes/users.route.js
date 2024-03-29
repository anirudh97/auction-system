const express = require('express');
const path = require('path');
const router = express.Router();
const users = require("../controllers/users.controller.js");
const questions = require("../controllers/questions.controller");

router.post('/deleteUser', users.deleteUser)
router.post('/signup', users.create)
router.post('/signin', users.signin)

router.get('/signup', (req, res) => {
	res.render('pages/signup');
});

router.get('/home', (req, res) => {
	if (req.session.loggedIn != true){
        res.redirect("/");
    }
	else if (req.session.alertData){
		data = {data: {"user": req.session.user, "alertData": req.session.alertData}};
		delete req.session.alertData;
		res.render('pages/home', data);
	}
	else{
		data = {data: {"user": req.session.user}};
		res.render('pages/home', data);
	};
})

router.get('/custRepHome', questions.allQuestions);

router.get('/adminHome', (req, res) => {
	if (req.session.loggedIn != true){
        res.redirect("/");
    } else if (req.session.alertData){
		data = {data: {"user": req.session.user, "alertData": req.session.alertData}};
		delete req.session.alertData;
		res.render('pages/adminHome', data);
	}
	else{
		data = {data: {"user": req.session.user}};
		res.render('pages/adminHome', data);
	};
})

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
})
module.exports = router;

