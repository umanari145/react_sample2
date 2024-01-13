const mongoose = require("mongoose");

const PrefSchema = new mongoose.Schema({
  code: String,
  name: String,
});

const Pref = mongoose.model("Pref", PrefSchema);
module.exports = Pref;
