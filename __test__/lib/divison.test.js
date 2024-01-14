const division = require("../../lib/division");

test("division", () => {
  expect(division(2)).toBe("2の倍数");
  expect(division(3)).toBe("3の倍数");
  expect(division(5)).toBe("5の倍数");
  expect(division(1)).toBe("not ２、３、５の倍数");
  // exceptionの場合、下記のようにかく
  expect(() => division("aaa")).toThrow(TypeError);
  expect(() => division("aaa")).toThrowError(/^数値ではありません。$/);
});
