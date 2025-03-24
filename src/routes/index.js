const newsRouter = require("./news");
const toursRouter = require("./tours");
const siteRouter = require("./site");
const adminRouter = require("./admin");

function routes(app) {
  app.use("/news", newsRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
  app.use("/tours", toursRouter);
}

module.exports = routes;
