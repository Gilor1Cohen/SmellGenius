const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Name: { type: String, required: true },
  YearOfBirth: { type: Number },
  Gender: { type: String, enum: ["Male", "Female", "Other"] },
  FavoritePerfumes: [{ type: String }],
});

module.exports = model("users", userSchema);
