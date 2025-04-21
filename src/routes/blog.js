const express = require("express");
const router = express.Router();
const Blog = require("../app/models/Blogs");
const BlogController = require("../app/controllers/BlogController");

router.get("/", BlogController.index); // Get all blogs

module.exports = router;

