const mongoose = require("mongoose");

const perfumeSchema = new mongoose.Schema({
  url: { type: String, required: true },
  Perfume: { type: String, required: true },
  Brand: { type: String, required: true },
  Country: { type: String, required: true },
  Gender: { type: String, required: true },
  RatingValue: { type: String, required: true },
  RatingCount: { type: String, required: true },
  Year: { type: String, required: true },
  Top: { type: String, required: true },
  Middle: { type: String, required: true },
  Base: { type: String, required: true },
  Perfumer1: { type: String, required: true },
  Perfumer2: { type: String, default: null },
  mainaccord1: { type: String, required: true },
  mainaccord2: { type: String, required: true },
  mainaccord3: { type: String, required: true },
  mainaccord4: { type: String, required: true },
  mainaccord5: { type: String, required: true },
});

module.exports = mongoose.model("perfumes", perfumeSchema);
