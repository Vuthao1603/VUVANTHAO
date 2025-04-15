// Using Node.js `require()`
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://tuanthanh2kk4:tuanthanh2kk4@cluster0.nzrns.mongodb.net/test_express"
    );
    console.log("Connect success");
  } catch (error) {
    console.log("Fail to connect", error);
  }
}

module.exports = { connect };
