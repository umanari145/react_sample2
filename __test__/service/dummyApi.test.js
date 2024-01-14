const getName = require("../../service/dummyapi");

test("getName async/await", async () => {
  // awaitをつかう or promiseのcallback
  const result = await getName();
  expect(result).toBe("yamada");

  getName().then((res) => {
    expect(res).toBe("yamada");
  });
});
