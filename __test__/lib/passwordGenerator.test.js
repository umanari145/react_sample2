const PasswordGenerator = require("../../lib/passwordGenerator");

describe("PasswordGenerator", () => {
  test("generatePassword should return a password with the required criteria", () => {
    const passwordGenerator = new PasswordGenerator();
    const generatedPassword = passwordGenerator.generatePassword();

    // 8文字以上のパスワードであることを確認
    expect(generatedPassword.length).toBeGreaterThanOrEqual(8);

    // 半角小文字英単語、半角大文字英単語、数字、記号をそれぞれ1文字以上含むことを確認
    expect(/[a-z]/.test(generatedPassword)).toBe(true);
    expect(/[A-Z]/.test(generatedPassword)).toBe(true);
    expect(/[0-9]/.test(generatedPassword)).toBe(true);
    expect(/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(generatedPassword)).toBe(true);
  });
});
