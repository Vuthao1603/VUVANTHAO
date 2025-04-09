const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Accounts = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Accounts", Accounts);
