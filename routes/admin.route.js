const express = require('express');
const path = require('path');
const router = express.Router();
const admin = require("../controllers/admin.controller.js");

router.post('/createCustRep', admin.createCustRep);
router.post('/addCategory', admin.addCategory);

router.get('/categorySale', admin.categorySale);
router.get('/userEarnings', admin.userEarnings);
router.get('/siteWideTotalSales', admin.siteWideTotalSales);
router.get('/bestSellingItems', admin.bestSellingItems);
router.get('/userWithMostSpending', admin.userWithMostSpending);







module.exports = router;