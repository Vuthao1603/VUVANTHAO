const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
const { ensureAdmin } = require("../app/middleware/authMiddleware"); // Import middleware
const bookingController = require("../app/controllers/BookingController");

router.get("/stored/tours", adminController.storedTours);
router.get("/", adminController.admin);
router.get("/bookings", ensureAdmin, adminController.listBookings); // Sử dụng middleware ensureAdmin
router.get("/bookings/export-excel", bookingController.exportExcel);

module.exports = router;
