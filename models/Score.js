const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  name: String,
  area: String,
  style: String,
  point: Number,
  month: Number,
});

const Score = mongoose.model("Scores", ScoreSchema);
module.exports = Score;
