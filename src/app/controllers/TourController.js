const Tours = require("../models/Tours");
const {mongooseToObject} = require("../../util/mongoose");

class TourController {
 
  // [GET] /show/:slug
  show(req, res, next) {
    Tours.findOne({slug: req.params.slug})
      .then(tour => {
        res.render('tours/show', {tour: mongooseToObject(tour)});
      })
      .catch(next);
  }

  // [GET] /tours/create
  create(req, res, next) {
    res.render('tours/create');
  }

  //  [POST] /tours/store
   store(req, res, next) {
    // res.json(req.body);
    const FormData = req.body;
    FormData.image = `https://img.youtube.com/vi/${req.body.videoid}/sddefault.jpg`;
    const tour = new Tours(FormData);
    tour.save()
      .then(() => res.redirect('/'))
      .catch(error => {});
      
  }

}

module.exports = new TourController();

