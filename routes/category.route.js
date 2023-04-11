const express = require('express');
const path = require('path');
const router = express.Router();
const category = require("../controllers/category.controller.js");

router.get('/', category.getCategory);







module.exports = router;