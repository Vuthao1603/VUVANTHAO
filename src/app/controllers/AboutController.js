const { model } = require("mongoose");

class AboutController {
  // GET about page
  index(req, res, next) {
    res.render("about", { layout: "about-layout" });
  }


}
module.exports = new AboutController();
