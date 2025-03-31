const express = require("express");
const router = express.Router();

const tourController = require("../app/controllers/TourController");

router.get("/create", tourController.create);
router.post("/store", tourController.store);
router.get("/:id/edit", tourController.edit);
router.put("/:id", tourController.update);
router.delete("/:id", tourController.destroy);
router.get("/:slug", tourController.show);

module.exports = router;
