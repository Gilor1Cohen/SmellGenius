const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
  perfumeName: { type: String, required: true },
  gender: { type: String, enum: ["Men", "Women", "Unisex"], required: true },
  priceBeforeDiscount: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  url: { type: String, required: true },
});

module.exports = model("store", storeSchema, "store");
