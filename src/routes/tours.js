const express = require("express");
const router = express.Router();
const tourController = require("../app/controllers/TourController");
const { ensureAuthenticated, ensureAdmin } = require("../app/middleware/authMiddleware");

router.get("/create", ensureAuthenticated, ensureAdmin, tourController.create);
router.post("/store",ensureAuthenticated,ensureAdmin, tourController.store);
router.get("/api/search", tourController.liveSearch);
router.get("/:id/edit", ensureAuthenticated, ensureAdmin, tourController.edit);
router.put("/:id", ensureAuthenticated, ensureAdmin, tourController.update);
router.delete("/:id", ensureAuthenticated, ensureAdmin, tourController.destroy);
router.get("/:slug/book", tourController.book);
router.post("/:slug/book", tourController.handleBooking);
router.get("/:slug", tourController.show); 


module.exports = router;
