const { model } = require("mongoose");

class AboutController {
  // GET about page
  index(req, res, next) {
    res.render("about", { layout: "about-layout" });
  }

  // GET about/:slug page
  show(req, res) {
    res.send("ABOUT DETAIL!");
  }
}
module.exports = new AboutController();
