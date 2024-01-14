const getName = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("yamada");
    }, 1000); // 1000ミリ秒（1秒）後に解決されるPromise
  });
};

module.exports = getName;
