// Using Node.js `require()`
const mongoose = require("mongoose");



async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Book_tour_checkking");
    console.log("Connect success");
  } catch (error) {
    console.log("Fail to connect", error);
  }
}

module.exports = { connect };


