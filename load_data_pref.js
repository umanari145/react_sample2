const mongoose = require("mongoose");
const csv = require("csvtojson");
const Pref = require("./models/Pref");

mongoose
  .connect("mongodb://test_user:password@mongo:27017/city")
  .then(() => {
    console.log("MongoDBに接続しました");
    // CSVファイルからデータを読み取り、MongoDBに挿入
    const csvFilePath = "pref.CSV"; // CSVファイルのパスを指定
    csv()
      .fromFile(csvFilePath)
      .then((jsonArray) => {
        Pref.insertMany(jsonArray)
          .then((insertedData) => {
            console.log("データを挿入しました:", insertedData);
          })
          .catch((error) => {
            console.error("データの挿入に失敗しました:", error);
          });
      })
      .catch((error) => {
        console.error("CSVデータの読み取りに失敗しました:", error);
      });
  })
  .catch((error) => {
    console.error("MongoDBへの接続に失敗しました", error);
  });
