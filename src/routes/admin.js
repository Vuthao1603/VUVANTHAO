const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");

router.get("/stored/tours", adminController.storedTours);
router.get("/", adminController.admin);

module.exports = router;
