const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const Tours = new Schema(
  {
    name: { type: String, required: true },
    lictrinh:[
      {
        day: { type: String },
        content: { type: String },
      }
    ],
    gia: { type: String },
    matour: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
    videoid: { type: String },
    checkin: { type: String },
    ngaydi: { type: String },
    ngayve: { type: String },
    phuongtien: { type: String },
    thoigianlytuong: { type: String },
    khuyenmai: { type: String },
    doituong: { type: String },
    amthuc: { type: String },
    diemdi: { type: String },
    diemden: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tours", Tours);
