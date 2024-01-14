const getArea = require("../../service/area");
const connectDB = require("../../db");
const request = require("supertest");
const app = require("../../app");

jest.mock("../../service/area");
jest.mock("../../db");

const mockData = [
  {
    _id: "65a3690e2c2551de580812c3",
    zip: "2740077",
    pref_kana: "チバケン",
    city_kana: "フナバシシ",
    town_kana: "ヤクエンダイ",
    pref: "千葉県",
    city: "船橋市",
    town: "薬円台",
    __v: 0,
  },
];

describe("getArea", () => {
  beforeEach(() => {
    getArea.mockResolvedValue(mockData);
    // mongoもMock化しないとここを通っているのでおちてしまう
    connectDB.mockResolvedValue(null);
  });

  test("API zip endpoint test", async () => {
    const res = await request(app).get("/api/zip/2740077");
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual(mockData[0]);
  });
});
