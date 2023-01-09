import { ApiService, bubbleSort, fetchUserName, numberFormat } from "../inafune";
import axios from "axios";

jest.mock("axios");

describe("inafuneさんの作った関数のテスト", () => {
  describe("Q1.numberFormatのテスト", () => {
    it("引数に4桁以上の数字を与えた場合、3桁区切りでカンマを入れて返す", () => {
      expect(numberFormat(123456789)).toBe("123,456,789");
    });

    it("引数に4桁以上の数字を与えた場合、3桁区切りでカンマを入れて返す", () => {
      expect(numberFormat(123456789)).toBe("123,456,789");
    });

    it("小数第三位の数が5以上の場合、小数第三位で切り上げをする", () => {
      expect(numberFormat(1.2345)).toBe("1.235");
    });

    it("小数第二位以上の桁数の数字を与えた場合、小数の四捨五入をしない", () => {
      expect(numberFormat(1.23)).toBe("1.23");
    });

    it("小数の桁の末尾の数字が0の場合、0を切り捨てて返す", () => {
      expect(numberFormat(1.0)).toBe("1");
    });

    it("16進数の値を与えた場合、10進数に変換してカンマ区切りで返す", () => {
      expect(numberFormat(0xfeee)).toBe("65,262");
    });

    it("負の数を与えた場合、負の数でカンマ区切りで返す", () => {
      expect(numberFormat(-209387474)).toBe("-209,387,474");
    });
  });

  describe("Q2.bubbleSortのテスト", () => {
    it("引数に与えた配列を昇順にソートして返す", () => {
      expect(bubbleSort([3, 9, 2])).toEqual([2, 3, 9]);
    });

    it("空の配列を与えた場合、空の配列を返す", () => {
      expect(bubbleSort([])).toEqual([]);
    });
  });

  describe("Q3.fetchUserNameのテスト", () => {
    const axiosGetMock = axios.get as jest.Mock;

    it("/usersエンドポイントを叩いて取得した値を返す", () => {
      axiosGetMock.mockImplementation(() => {
        return Promise.resolve({
          data: {
            name: "Grace",
          },
        });
      });
      expect(fetchUserName(1, new ApiService())).resolves.toBe("Grace");
    });

    // TODO: PASSするように修正する
    it("/usersエンドポイントを叩いてAPIがエラーを返した場合、空文字列を返す", async () => {
      axiosGetMock.mockImplementation(() => {
        return Promise.reject(() => {
          throw Error("Failed to fetch user.");
        });
      });
      const actual = await fetchUserName(1, new ApiService());
      const expected = "";
      expect(actual).toBe(expected);
    });
  });
});
