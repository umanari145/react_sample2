const fs = require("fs");
const csvtojson = require("csvtojson");
const { MongoClient } = require("mongodb");

const csvFilePath = "./csv/KEN_ALL.CSV"; // CSVファイルのパスを指定
const databaseUrl = "mongodb://root:pass@mongo:27017"; // MongoDBの接続URLを指定 mongodb://ユーザー名:パスワード@サーバー名:port
const databaseName = "city"; // データベース名を指定
const collectionName = "area"; // コレクション名を指定

(async () => {
  try {
    // MongoDBに接続
    const client = new MongoClient(databaseUrl);
    await client.connect();

    // データベースとコレクションを取得
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // CSVファイルからデータを読み込む
    const jsonArray = await csvtojson().fromFile(csvFilePath);

    // データをMongoDBに挿入
    const result = await collection.insertMany(jsonArray);
    console.log(`${result.insertedCount}件のドキュメントが挿入されました。`);

    // MongoDBとの接続を閉じる
    client.close();
  } catch (err) {
    console.error("エラー:", err);
  }
})();
