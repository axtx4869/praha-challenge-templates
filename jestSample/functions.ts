import { NameApiService as _nameApiService } from "./nameApiService";
import { DatabaseMock as _databaseMock } from "./util";

export const sumOfArray = (numbers: number[]): number => {
  if (numbers.length === 0) {
    return 0;
  }
  return numbers.reduce((a: number, b: number): number => a + b);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export const asyncSumOfArraySometimesZero = (numbers: number[], DatabaseMock: any = _databaseMock): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      const database = new DatabaseMock();
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  NameApiService: any = _nameApiService
): Promise<string> => {
  const nameApiService = new NameApiService();
  const firstName = await nameApiService.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
