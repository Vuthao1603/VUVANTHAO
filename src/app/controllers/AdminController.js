const Tours = require("../models/Tours");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class AdminController{
  // [GET] /admin/stored/tours
  storedTours(req, res, next) {
    Tours.find({})
      .then((tours) =>
        res.render("admin/stored-tours", {
          tours: mutipleMongooseToObject(tours),
        })
      )
     .catch((error) => next(error));
    
    }
}

module.exports = new AdminController();
