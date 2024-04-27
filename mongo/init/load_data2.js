db = db.getSiblingDB("sample_db2");
db = connect("mongodb://root:pass@localhost:27017/sample_db2");

db = db.getSiblingDB("sample_db2");

// ユーザー情報を挿入する新しいコレクションを用意
db.createCollection("students");

// ユーザーデータ
const students = [
  {
    _id: 1,
    name: "Taro",
    grades: [
      { course: "Math", score: 81 },
      { course: "History", score: 78 },
      { course: "Science", score: 85 },
    ],
  },
  {
    _id: 2,
    name: "Hanako",
    grades: [
      { course: "Math", score: 65 },
      { course: "History", score: 95 },
      { course: "Science", score: 71 },
    ],
  },
  {
    _id: 3,
    name: "Jiro",
    grades: [
      { course: "Math", score: 55 },
      { course: "History", score: 30 },
      { course: "Science", score: 20 },
    ],
  },
];

// コレクションにデータを挿入
db.students.insertMany(students);

// addFiledsとfilter
// db.students.aggregate([
//   {
//     $addFields: {
//       high_scores: {
//         $filter: {
//           input: "$grades", // 処理する配列
//           as: "grade", // 配列の各要素を参照するための変数名
//           cond: { $gte: ["$$grade.score", 80] }, // 条件（ここではスコアが80以上）
//         },
//       },
//     },
//   },
// ]);

// db.students.aggregate([
//   {
//     $unwind: "$grades", // grades 配列の展開
//   },
//   {
//     $addFields: {
//       high_score: {
//         $cond: {
//           if: { $gte: ["$grades.score", 80] }, // 条件：スコアが80以上
//           then: "$grades", // 条件を満たす場合はgradesオブジェクトをそのまま返す
//           else: null, // 条件を満たさない場合はnullを設定
//         },
//       },
//     },
//   },
//   {
//     $match: { high_score: { $ne: null } }, // high_scoreがnullでないドキュメントのみを選択
//   },
// ]);
