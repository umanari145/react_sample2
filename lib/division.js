const division = (num) => {
  if (isNaN(num)) {
    throw new TypeError("数値ではありません。");
  }

  if (num % 2 === 0) return "2の倍数";
  if (num % 3 === 0) return "3の倍数";
  if (num % 5 === 0) return "5の倍数";
  return "not ２、３、５の倍数";
};

module.exports = division;
