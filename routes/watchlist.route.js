const express = require('express');
const path = require('path');
const router = express.Router();
const watchlist = require("../controllers/watchlist.controller.js");

router.get('/', watchlist.getWatchlist);
router.post('/addWatchlist', watchlist.addToWatchlist);
router.get('/trackWatchlist', watchlist.trackWatchlist);


module.exports = router;