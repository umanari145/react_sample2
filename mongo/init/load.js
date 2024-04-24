db = connect("mongodb://root:pass@localhost:27017/admin");

// エラーはでるが正常に当路なn巣荒れている
db.createUser({
  user: "myUser",
  pwd: "myPassword123",
  roles: [{ role: "readWrite", db: "sample_db" }],
});

db = db.getSiblingDB("sample_db");

// mynewdatabaseに接続
// エラーはでているが正常に登録されている
db = connect("mongodb://myUser:myPassword123@localhost:27017/sample_db");

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
