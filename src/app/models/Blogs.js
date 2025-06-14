const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});

module.exports = mongoose.model("Blog", BlogSchema);
