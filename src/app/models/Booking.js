const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // ID của người dùng đã đăng nhập
    tour: { type: Schema.Types.ObjectId, ref: "Tour" }, // ID của tour đã đặt
    slug: { type: String, required: true }, // Slug của tour
    name: { type: String, required: true }, // Tên tour
    customerName: { type: String, required: true }, // Tên khách hàng
    soLuongNguoiLon: { type: Number, required: true }, // Số lượng người lớn
    soLuongTreEm: { type: Number, required: true }, // Số lượng trẻ em
    soLuongEmBe: { type: Number, required: true }, // Số lượng em bé
    email: { type: String, required: true }, // Email khách hàng
    phone: { type: String, required: true }, // Số điện thoại
    address: { type: String }, // Địa chỉ
    ngaydi: { type: String, required: true }, // Ngày khởi hành
    note: { type: String }, // Ghi chú
    totalPrice: { type: Number, required: true }, // Tổng tiền
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", BookingSchema);
