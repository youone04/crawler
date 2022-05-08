const express = require("express");
let router = express.Router();
const crawl = require('../crawl');

router.get("/berita",crawl.scraperData);
router.get("/berita-all",crawl.scraperDataAll);



module.exports = { router };