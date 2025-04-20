const Tours = require("../models/Tours");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { log } = require("handlebars");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Tours.find({}) // lấy tất cả dữ liệu trong bảng tours
      .then((tours) => {
        res.render("alltour2", { layout: "about-layout", tours: mutipleMongooseToObject(tours) });
      })
      .catch(next);
  }


  // [GET] /home
  index1(req, res, next) {
    Tours.find({}) // lấy tất cả dữ liệu trong bảng tours
      .then((tours) => {
        res.render("home", { tours: mutipleMongooseToObject(tours) });
      })
      .catch(next);
  }
}

module.exports = new SiteController();
