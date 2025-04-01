const express = require("express");
const router = express.Router();

const authenController = require("../app/controllers/AuthenController");

router.get("/", authenController.showRegisterform);
router.post("/", authenController.login);

module.exports = router;