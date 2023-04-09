const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const auctions = require("../controllers/auctions.controller.js");


router.get('/', auctions.getAuctions);
router.get('/new', (req, res) => {
    if(req.session.loggedIn == false){
        res.redirect('/');
    }
    else{
        res.render('pages/createAuction', {"data": {"user": req.session.user}});
    };
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

router.post('/new', upload.array('multi-files'), auctions.create);

router.get('/myAuctions', auctions.getMyAuctions);

router.get('/:auctionId', auctions.getAuction);




module.exports = router;

