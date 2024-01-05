const express = require("express");
const Score = require("../models/Score");
const router = express.Router();
const _ = require("lodash");

router.get("/score", async (req, res, next) => {
  try {
    const { area, style, minPoint, maxPoint, month } = req.query;

    const queryParam = {};
    let ltePoint = {};
    let gtePoint = {};
    if (area) queryParam.area = area;
    if (month) queryParam.month = month;
    if (minPoint) ltePoint = { $gte: minPoint };
    if (maxPoint) gtePoint = { $lte: maxPoint };
    Object.assign(ltePoint, gtePoint);
    Object.assign(queryParam, ltePoint);
    if (style) {
      queryParam.style = style;
    }

    console.log(queryParam);
    const result = await Score.find(queryParam);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
