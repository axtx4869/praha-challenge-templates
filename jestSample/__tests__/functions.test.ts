import { asyncSumOfArray, sumOfArray, asyncSumOfArraySometimesZero, getFirstNameThrowIfLong } from "../functions";
import { NameApiService } from "../nameApiService";
import { DatabaseMock } from "../util";

jest.mock("../util");
jest.mock("../nameApiService");

const nameApiServiceMock = NameApiService as jest.Mock;
const databaseMock = DatabaseMock as jest.Mock;

describe("sumOfArray関数のテスト", () => {
  it("引数に与えた配列の各インデックス値の和と戻り値が等しい", () => {
    expect(sumOfArray([1, 2, 3])).toBe(6);
  });

  it("引数に空配列を与えた場合TypeErrorが発生する", () => {
    expect(() => sumOfArray([])).toThrow(TypeError);
  });
});

describe("asycSumOfArray関数のテスト", () => {
  it("引数に与えた配列の各インデックス値の和と戻り値が等しい", async () => {
    expect(await asyncSumOfArray([1, 2, 3])).toBe(6);
  });
});

describe("asyncSumOfArraySometimesZero関数のテスト", () => {
  it("引数に与えた配列の各インデックス値の和と戻り値が等しい", async () => {
    databaseMock.mockImplementation(() => {
      return {
        save: jest.fn(),
      };
    });
    expect(await asyncSumOfArraySometimesZero([1, 2, 3], databaseMock)).toBe(6);
  });

  it("DatabaseMockクラスのsaveメソッドがErrorをthrowした時、0を返す", async () => {
    databaseMock.mockImplementation(() => {
      return {
        save: jest.fn(() => {
          throw new Error();
        }),
      };
    });
    expect(await asyncSumOfArraySometimesZero([1, 2, 3], databaseMock)).toBe(0);
  });
});

describe("getFirstNameThrowIfLong関数のテスト", () => {
  it("NameApiServiceクラスのgetFirstNameメソッドの戻り値が最大文字数以下の時、firstNameを返す", async () => {
    nameApiServiceMock.mockImplementation(() => {
      return {
        getFirstName: jest.fn(() => {
          return "Bob";
        }),
      };
    });
    expect(await getFirstNameThrowIfLong(3, nameApiServiceMock)).toBe("Bob");
  });

  it("NameApiServiceクラスのgetFirstNameメソッドの戻り値が最大文字数を上回る時、Errorをthrowする", () => {
    nameApiServiceMock.mockImplementation(() => {
      return {
        getFirstName: jest.fn(() => {
          return "Emma";
        }),
      };
    });
    expect(getFirstNameThrowIfLong(3, nameApiServiceMock)).rejects.toThrow("first_name too long");
  });
});
