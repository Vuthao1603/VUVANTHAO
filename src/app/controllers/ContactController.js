const { model } = require("mongoose");

class ContactController {
  // GET about page
  index(req, res, next) {
    res.render("contact", { layout: "about-layout" });
  }
}
module.exports = new ContactController();
