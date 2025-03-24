const Tours = require("../models/Tours");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class AdminController{
  // [GET] /admin/stored/tours
  storedTours(req, res) {
    res.render("admin/stored-tours");
   
}
}

module.exports = new AdminController();
