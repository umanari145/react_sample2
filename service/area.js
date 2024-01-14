const Area = require("../models/Area");

const getArea = async (zip) => {
  return await Area.find({
    zip: { $regex: `^${zip}`, $options: "i" },
  });
};

module.exports = getArea;
