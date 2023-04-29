const express = require('express');
const path = require('path');
const router = express.Router();
const questions = require("../controllers/questions.controller.js");


router.post('/createQuestion', questions.createQuestion)
router.post('/postAnswer/:questionId', questions.postAnswer)
router.get('/myQuestions', questions.myQuestions)
router.get('/', questions.allQuestions)
router.get('/search', (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    } else{
        res.render("pages/questionSearchResult.ejs");
    }
});


module.exports = router;