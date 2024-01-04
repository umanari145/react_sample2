const express = require("express");
const Area = require("../models/Area");
const Pref = require("../models/Pref");
const router = express.Router();

/* GET users listing. */
router.get("/prefectures", async (req, res, next) => {
  try {
    const result = await Pref.find();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/zip", async (req, res, next) => {
  try {
    const result = await Area.find({ zip: "2740077" }).limit(10);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
