const express = require('express');
const path = require('path');
const router = express.Router();
const bids = require("../controllers/bids.controller.js");


router.post('/deleteAutoBid/:auctionId', bids.deleteAutoBid);
router.post('/postBid/:auctionId', bids.postBid);
router.post('/createAutoBid/:auctionId', bids.createAutoBid);
router.get('/checkUpperLimit', bids.checkUpperLimit);
router.get('/postAutoBid', bids.postAutoBid);


module.exports = router;