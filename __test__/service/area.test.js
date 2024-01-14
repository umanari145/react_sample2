const getArea = require("../../service/area");

jest.mock("../../service/area");

describe("getArea　test", () => {
  beforeEach(() => {
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
    getArea.mockResolvedValue(mockData);
  });

  test("getArea", async () => {
    const zip = "2740077";
    const result = await getArea(zip);
    expect(result[0]["zip"]).toBe("2740077");
    expect(result[0]["pref_kana"]).toBe("チバケン");
    expect(result[0]["city_kana"]).toBe("フナバシシ");
    expect(result[0]["town_kana"]).toBe("ヤクエンダイ");
    expect(result[0]["pref"]).toBe("千葉県");
    expect(result[0]["city"]).toBe("船橋市");
    expect(result[0]["town"]).toBe("薬円台");
  });
});
