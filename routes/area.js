const express = require("express");
const Area = require("../models/Area");
const Pref = require("../models/Pref");
const router = express.Router();

/* GET users listing. */
router.get("/prefectures", async (req, res, next) => {
  try {
    const result = await Pref.find();
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/zip/:zip", async (req, res, next) => {
  try {
    const { zip } = req.params;
    const result = await Area.find({
      zip: { $regex: `^${zip}`, $options: "i" },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
