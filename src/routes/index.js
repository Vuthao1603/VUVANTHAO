const newsRouter = require("./news");
const toursRouter = require("./tours");
const siteRouter = require("./site");

function routes(app) {
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
  app.use("/tours", toursRouter);
}

module.exports = routes;
