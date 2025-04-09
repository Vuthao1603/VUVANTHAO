const express = require("express");
const newsRouter = require("./news");
const toursRouter = require("./tours");
const siteRouter = require("./site");
const adminRouter = require("./admin");
const authenRouter = require("./login");
const registerRouter = require("./register");
const aboutRouter = require("./about");

function routes(app) {
  app.use("/news", newsRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
  app.use("/tours", toursRouter);
  app.use("/login", authenRouter);
  app.use("/register", registerRouter);
  app.use("/about", aboutRouter);
}

module.exports = routes;
