import { ZipcodeApiServiceImpl, ZipcodeApiService } from "./zipCodeApiService";

export const haveHumanRight = (height: number, gender: "MALE" | "FEMALE" | "OTHER"): boolean =>
  !(gender === "MALE" && height < 170);

export const comma = (num?: number | string): string => {
  if (!num) {
    throw new Error("num is required");
  }
  const numericValue = typeof num === "number" ? num : Number(num);
  return numericValue.toLocaleString();
};

export const getPrefectureNameByZipcode = async (
  zipcode: number,
  zipcloudApiService: ZipcodeApiService = new ZipcodeApiServiceImpl()
): Promise<string> => {
  try {
    const prefectureName = (await zipcloudApiService.getAddressByZipCode(zipcode)).results[0].address1;
    return prefectureName;
  } catch (error) {
    return "Prefecture Not Found";
  }
};
