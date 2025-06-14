// controllers/BookingController.js
const ExcelJS = require("exceljs");
const Booking = require("../models/Booking");

module.exports = {
  async myBookings(req, res) {
    const userId = req.session.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("tour")
      .lean();
    res.render("my-booking", { bookings });
  },

  async exportExcel(req, res) {
    const bookings = await Booking.find().populate("tour").lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Bookings");

    worksheet.columns = [
      { header: "Tên khách hàng", key: "customerName", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Số điện thoại", key: "phone", width: 15 },
      { header: "Tên tour", key: "tourName", width: 25 },
      { header: "Ngày đi", key: "ngaydi", width: 15 },
      { header: "Số vé người lớn", key: "soLuongNguoiLon", width: 15 },
      { header: "Số vé trẻ em", key: "soLuongTreEm", width: 15 },
      { header: "Số vé em bé", key: "soLuongEmBe", width: 15 },
      { header: "Tổng tiền", key: "totalPrice", width: 15 },
    ];

    bookings.forEach((b) => {
      worksheet.addRow({
        customerName: b.customerName,
        email: b.email,
        phone: b.phone,
        tourName: b.tour?.name,
        ngaydi: b.ngaydi,
        soLuongNguoiLon: b.soLuongNguoiLon,
        soLuongTreEm: b.soLuongTreEm,
        soLuongEmBe: b.soLuongEmBe,
        totalPrice: b.totalPrice,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="bookings.xlsx"',
    );

    await workbook.xlsx.write(res);
    res.end();
  },
};
