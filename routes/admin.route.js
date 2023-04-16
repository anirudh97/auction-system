const express = require('express');
const path = require('path');
const router = express.Router();
const admin = require("../controllers/admin.controller.js");

router.post('/createCustRep', admin.createCustRep);
router.post('/addCategory', admin.addCategory);

// router.get('/report1', admin.report1);
// router.get('/report2', admin.report2);
// router.get('/report3', admin.report3);
// router.get('/report4', admin.report4);







module.exports = router;