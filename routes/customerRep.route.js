const express = require('express');
const path = require('path');
const router = express.Router();
const customerRep = require("../controllers/customerRep.controller.js");


router.get('/resetUser', customerRep.getUsers);
router.post('/resetUser', customerRep.resetUser);
module.exports = router;