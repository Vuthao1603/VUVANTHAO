const express = require("express");
const router = express.Router();
const vnpayController = require("../app/controllers/VNPayController");

router.post("/create_payment", vnpayController.createPayment);
router.get("/vnpay_return", vnpayController.vnpayReturn);

module.exports = router;
