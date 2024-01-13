const csvLoad = require("./base_load_data");
const Pref = require("./models/Pref");
const Area = require("./models/Area");
const Score = require("./models/Score");

switch (process.argv[2]) {
  case "pref":
    csvLoad(Pref, "./csv/pref.csv");
    break;
  case "area":
    csvLoad(Area, "./csv/KEN_ALL.csv");
    break;
  case "score":
    csvLoad(Score, "./csv/score.csv");
    break;
}
