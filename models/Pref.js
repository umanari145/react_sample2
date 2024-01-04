const mongoose = require("mongoose");

const PrefSchema = new mongoose.Schema({
  code: String,
  name: String,
});

const Prea = mongoose.model("Pref", PrefSchema);
module.exports = Prea;
