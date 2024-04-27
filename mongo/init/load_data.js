db = connect("mongodb://root:pass@localhost:27017/sample_db");

db = db.getSiblingDB("sample_db");

// ユーザー情報を挿入する新しいコレクションを用意
db.createCollection("users");

// ユーザーデータ
const users = [
  { name: "Alice Johnson", age: 28, email: "alice@example.com" },
  { name: "Bob Smith", age: 35, email: "bob@example.com" },
  { name: "Carol White", age: 22, email: "carol@example.com" },
];

// コレクションにデータを挿入
db.users.insertMany(users);

// 挿入したデータを表示
const insertedData = db.users.find();
insertedData.forEach(printjson);

// ユーザー情報を挿入する新しいコレクションを用意
db.createCollection("products");
const products = [
  { _id: 1, name: "Apple", price: 30 },
  { _id: 2, name: "Banana", price: 20 },
  { _id: 3, name: "Cherry", price: 15 },
];

// コレクションにデータを挿入
db.products.insertMany(products);

const orders = [
  { _id: 101, product_id: 1, quantity: 2 },
  { _id: 102, product_id: 2, quantity: 5 },
  { _id: 103, product_id: 3, quantity: 3 },
  { _id: 104, product_id: 1, quantity: 1 },
];

db.orders.insertMany(orders);

// aggragateのサンプル
// db.orders.aggregate([
//   {
//     $lookup: {
//       from: "products",          // 結合するコレクション
//       localField: "product_id",  // 結合するためのローカルフィールド
//       foreignField: "_id",       // 外部コレクションのフィールド
//       as: "product_details"      // 結果を入れるフィールド名
//     }
//   }
// ]);
