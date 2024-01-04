const mongoose = require("mongoose");

const AreaSchema = new mongoose.Schema({
  zip: String,
  pref_kana: String,
  city_kana: String,
  town_kana: String,
  pref: String,
  city: String,
  town: String,
});

const Area = mongoose.model("Area", AreaSchema);
module.exports = Area;
