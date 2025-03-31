const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const Tours = new Schema(
  {
    name: { type: String, required: true },
    thongtin: { type: String },
    lichtrinh: { type: String },
    gia: { type: String },
    matour: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
    videoid: { type: String },
    date: { type: Date },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tours", Tours);
