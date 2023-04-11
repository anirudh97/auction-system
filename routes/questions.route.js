const express = require('express');
const path = require('path');
const router = express.Router();
const questions = require("../controllers/questions.controller.js");


router.post('/createQuestion', questions.createQuestion)
router.post('/postAnswer/:questionId', questions.postAnswer)
router.get('/myQuestions', questions.myQuestions)
router.get('/', questions.allQuestions)


module.exports = router;