var logger = require("../lib/logger");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/logger", function (req, res, next) {
  logger.trace("traceを出力します。");
  logger.debug("debugを出力します。");
  logger.info({ parameter: "parameter情報です。" }, "infoを出力します。");
  logger.warn("warnを出力します。");
  logger.error({ error: "error情報です" }, "errorを出力します。");
  logger.fatal("fatalを出力します。");

  res.json({
    status: 200,
  });
});

module.exports = router;
