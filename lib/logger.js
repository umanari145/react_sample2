const pino = require("pino");
const options = require("pino-pretty");
//参考 https://github.com/pinojs/pino-pretty
// Pinoのカスタム設定を定義
const _options = {
  transport: {
    target: "pino-pretty",
  },
};

const op = new options({
  ..._options,
  colorize: true, // カラー表示を有効化
  translateTime: "yyyy-mm-dd HH:MM:ss", // 日時フォーマット
  ignore: "pid,hostname,parameter,error",
  messageFormat: (log) => {
    // 10:trace 20:debug 30:info 40:warn 50:error 60:fatal
    let message;
    switch (log.level) {
      case 30:
        message = `パラメーター:${log.parameter}`;
        break;
      case 50:
        message = `エラー:${log.error}`;
        break;
      default:
        message = "それ以外";
        break;
    }
    return message + log.msg;
  },
});
const logger = pino(op);
// levelはこのようにかかないとダメらしい
logger.level = "debug";
module.exports = logger;
