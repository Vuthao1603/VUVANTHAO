const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/search", siteController.search);
// router.get("/login", siteController.login);
router.get("/alltour", siteController.index);
router.get("/", siteController.index1); //cai nay phai o duoi

module.exports = router;
