const express = require('express');
const path = require('path');
const router = express.Router();
const bids = require("../controllers/bids.controller.js");


router.post('/postBid/:auctionId', bids.postBid);


module.exports = router;