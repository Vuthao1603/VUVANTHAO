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
    res.render("tours/create"
      , {
        layout: "admin-edit-layout",
      }
    );
  }

  //  [POST] /tours/store
  store(req, res, next) {

    const formData = req.body;

    // Xử lý lịch trình nếu có
    if (formData.lichtrinh) {
      formData.lichtrinh = Object.values(formData.lichtrinh).filter(
        (item) => item.day || item.content // Loại bỏ các mục trống
      );
    }

    const tour = new Tours(formData);
    tour
      .save()
      .then(() => {
        console.log("Lưu tour thành công:", tour); // Log khi lưu thành công
        res.redirect("/admin");
      })
      .catch((error) => {
        console.error("Lỗi lưu tour:", error.message); // Log chi tiết lỗi
        res.status(500).send("Lỗi server");
      });
  }

  // [GET] /tours/:id/edit
  edit(req, res, next) {
    Tours.findById(req.params.id)
      .then(
        (tour) => res.render("tours/edit", { tour: mongooseToObject(tour),
          layout: "admin-edit-layout",
         }), //fodel tours file edit.hbs
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
    console.log("Xóa tour với ID:", req.params.id); // Log ID của tour cần xóa

    Tours.deleteOne({ _id: req.params.id })
      .then(() => {
        console.log("Xóa thành công");
        res.redirect("back");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa:", error);
        next(error);
      });
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

  // [GET] /
  index(req, res, next) {
    Tours.find({})
      .then((tours) => {
        // Thêm URL hình ảnh từ videoid
        tours = tours.map((tour) => {
          tour = tour.toObject();
          if (tour.videoid) {
            tour.image = `https://img.youtube.com/vi/${tour.videoid}/sddefault.jpg`;
          }
          return tour;
        });
        res.render("home", { tours });
      })
      .catch(next);
  }
}

module.exports = new TourController();
