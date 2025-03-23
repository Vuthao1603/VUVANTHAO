const Tours = require("../models/Tours");
const {mutipleMongooseToObject} = require("../../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Tours.find({}) // lấy tất cả dữ liệu trong bảng tours
      .then((tours) => {
        res.render('home',
          {tours: mutipleMongooseToObject(tours)});
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.send("SEARCH");
  }
}

module.exports = new SiteController();
