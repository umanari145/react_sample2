const mongoose = require("mongoose");
const csv = require("csvtojson");

const csvLoad = (gooseModel, csvFilePath) => {
  console.log(gooseModel);
  mongoose
    .connect("mongodb://test_user:password@mongo:27017/city")
    .then(() => {
      console.log("MongoDBに接続しました");
      csv()
        .fromFile(csvFilePath)
        .then((jsonArray) => {
          gooseModel
            .insertMany(jsonArray)
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
      console.error("エラーが発生しました", error);
    });
};
module.exports = csvLoad;
