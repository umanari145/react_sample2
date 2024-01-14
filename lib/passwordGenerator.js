class PasswordGenerator {
  constructor() {
    this.lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    this.uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.digits = "0123456789";
    this.symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  }

  generatePassword() {
    let password = "";

    // 1文字ずつランダムに選んでパスワードに追加
    password += this.getRandomChar(this.lowercaseChars);
    password += this.getRandomChar(this.uppercaseChars);
    password += this.getRandomChar(this.digits);
    password += this.getRandomChar(this.symbols);

    // 残りの文字をランダムに生成
    while (password.length < 8) {
      const charType = this.getRandomNumber(4); // 0, 1, 2, or 3
      switch (charType) {
        case 0:
          password += this.getRandomChar(this.lowercaseChars);
          break;
        case 1:
          password += this.getRandomChar(this.uppercaseChars);
          break;
        case 2:
          password += this.getRandomChar(this.digits);
          break;
        case 3:
          password += this.getRandomChar(this.symbols);
          break;
      }
    }

    // パスワードをシャッフルして返す
    return this.shuffleString(password);
  }

  getRandomChar(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }

  getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  shuffleString(string) {
    const array = string.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }
}

module.exports = PasswordGenerator;
