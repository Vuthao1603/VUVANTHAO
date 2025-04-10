const { model } = require("mongoose");

class ServicesController {
  // GET services page
  index(req, res, next) {
    res.render("services", { layout: "about-layout" });
  }

 
}
module.exports = new ServicesController();
