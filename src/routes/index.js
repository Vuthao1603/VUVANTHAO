const express = require("express");
const newsRouter = require("./news");
const toursRouter = require("./tours");
const siteRouter = require("./site");
const adminRouter = require("./admin");
const authenRouter = require("./login");
const registerRouter = require("./register");
const aboutRouter = require("./about");
const servicesRouter = require("./services");
const blogRouter = require("./blog");
const contactRouter = require("./contact");
const bookingRouter = require("./my-booking");
const vnpayRouter = require("./vnpay");

function routes(app) {
  app.use("/news", newsRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
  app.use("/tours", toursRouter);
  app.use("/login", authenRouter);
  app.use("/register", registerRouter);
  app.use("/about", aboutRouter);
  app.use("/services", servicesRouter);
  app.use("/blog", blogRouter);
  app.use("/contact", contactRouter);
  app.use("/my-booking", bookingRouter);
  app.use("/vnpay", vnpayRouter);
}

module.exports = routes;
