const mongoose = require("mongoose");

function connectDB() {
  return mongoose.connect(process.env.MONGO_URL);
}

module.exports = connectDB;
