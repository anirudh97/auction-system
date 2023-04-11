const express = require('express');
const path = require('path');
const router = express.Router();
const admin = require("../controllers/admin.controller.js");

router.post('/createCustRep', admin.createCustRep);
router.post('/addCategory', admin.addCategory);







module.exports = router;