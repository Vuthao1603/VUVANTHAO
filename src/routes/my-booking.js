const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/BookingController");

// Middleware kiểm tra đăng nhập
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  res.redirect("/login");
}

router.get("/", ensureAuthenticated, bookingController.myBookings);

module.exports = router;
