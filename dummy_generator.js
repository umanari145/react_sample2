const fs = require("fs");

const generateRandomData = (nameIndex, monthIndex) => {
  const names = ["山田", "鈴木", "田中", "佐藤", "高橋", "渡辺"];
  const departments = ["11", "12", "13", "11", "13", "12"];
  const employmentTypes = [
    "temporary",
    "permanent",
    "permanent",
    "temporary",
    "permanent",
    "temporary",
  ];

  const months = [...Array(12).keys()].map((num) => num + 1);
  const name = names[nameIndex];
  const department = departments[nameIndex];
  const employmentType = employmentTypes[nameIndex];
  const points = Math.floor(Math.random() * 101); // 0から100までのランダムなポイント
  const month = months[monthIndex];

  return `${name},${department},${employmentType},${points},${month}`;
};

const generateCSV = () => {
  const header = "name,area,style,point,month\n";
  let data = "";

  for (let nameIndex = 0; nameIndex < 6; nameIndex++) {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      data += generateRandomData(nameIndex, monthIndex) + "\n";
    }
  }

  return header + data;
};

const csvData = generateCSV();

fs.writeFile("./csv/score.csv", csvData, (err) => {
  if (err) throw err;
  console.log("サンプルデータがscore.csvに書き込まれました。");
});
