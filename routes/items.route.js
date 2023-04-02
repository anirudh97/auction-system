const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');


const items = require("../controllers/items.controller.js");

router.get('/', items.getItems)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage })

router.post('/addItem', upload.array('multi-files'), items.addItem)

module.exports = router;