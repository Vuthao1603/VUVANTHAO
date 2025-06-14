const Tours = require("../models/Tours");
const Booking = require("../models/Booking");
const { mongooseToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class AdminController {
  // [GET] /admin/stored/tours
  storedTours(req, res, next) {
    Tours.find({})
      .then((tours) =>
        res.render("admin/stored-tours", {
          tours: mutipleMongooseToObject(tours),
          layout: "admin-edit-layout",
        }),
      )
      .catch((error) => next(error));
  }

  // [GET] /admin
  admin(req, res, next) {
    res.render("admin/admin", {
      layout: "admin-layout",
    });
  }

  // [GET] /admin/bookings
  listBookings(req, res, next) {
    Booking.find({})
      .then((bookings) =>
        res.render("admin/bookings", {
          bookings: mutipleMongooseToObject(bookings),
          layout: "admin-edit-layout",
        }),
      )
      .catch((error) => next(error));
  }
}

module.exports = new AdminController();
