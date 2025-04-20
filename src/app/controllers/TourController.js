const Tours = require("../models/Tours");
const { mongooseToObject } = require("../../util/mongoose");

class TourController {
  // [GET] /show/:slug
  show(req, res, next) {
    Tours.findOne({ slug: req.params.slug })
      .then((tour) => {
        res.render("tours/show", {
          layout: "detial-tour",
          tour: mongooseToObject(tour),
        });
      })
      .catch(next);
  }

  // [GET] /tours/create
  create(req, res, next) {
    res.render("tours/create");
  }

  //  [POST] /tours/store
  store(req, res, next) {
    // res.json(req.body);
    const FormData = req.body;
    FormData.image = `https://img.youtube.com/vi/${req.body.videoid}/sddefault.jpg`;
    const tour = new Tours(FormData);
    tour
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }

  // [GET] /tours/:id/edit
  edit(req, res, next) {
    Tours.findById(req.params.id)
      .then(
        (tour) => res.render("tours/edit", { tour: mongooseToObject(tour) }), //fodel tours file edit.hbs
      )
      .catch(next);
  }

  // [PUT] /tours/:id
  update(req, res, next) {
    Tours.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/stored/tours"))
      .catch(next);
  }

  // [DELETE] /tours/:id
  destroy(req, res, next) {
    Tours.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [GET] /api/tours/search
  liveSearch(req, res, next) {
    const q = req.query.q; // Lấy từ khóa tìm kiếm từ query string

    Tours.find({ name: { $regex: q, $options: "i" } }) // Tìm kiếm gần đúng theo tên
      .then((tours) => {
        res.json(tours); // Trả về kết quả dưới dạng JSON
      })
      .catch((error) => {
        console.error("Lỗi tìm kiếm:", error);
        res.status(500).json({ error: "Lỗi server" });
      });
  }
}

module.exports = new TourController();
