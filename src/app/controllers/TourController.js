const Tours = require("../models/Tours");
const { mongooseToObject } = require("../../util/mongoose");
const Booking = require("../models/Booking");

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

  // [GET] /tours/:slug/book
  book(req, res, next) {
    Tours.findOne({ slug: req.params.slug }) // Tìm tour theo slug
      .then((tour) => {
        if (!tour) {
          return res.status(404).send("Tour not found");
        }
        res.render("book-tour", { layout: "about-layout", tour: mongooseToObject(tour) });
      })
      .catch(next);
  }

  // [POST] /tours/:slug/book
  handleBooking(req, res, next) {
    // Lấy thông tin tour từ slug
    Tours.findOne({ slug: req.params.slug })
      .then((tour) => {
        if (!tour) {
          return res.status(404).send("Tour not found");
        }

        // Tính tổng tiền
        const totalPrice = parseInt(tour.gia) * parseInt(req.body.soluong || 1);

        // Tạo dữ liệu đặt tour
        const bookingData = {
          slug: tour.slug,
          name: tour.name,
          customerName: req.body.name,
          soluong: parseInt(req.body.soluong || 1),
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          ngaydi: req.body.departure,
          note: req.body.note,
          totalPrice: totalPrice,
        };

        // Lưu vào cơ sở dữ liệu
        const booking = new Booking(bookingData);
        return booking.save();
      })
      .then(() => {
        res.redirect("/"); 
      })
      .catch(next);
  }
}

module.exports = new TourController();
