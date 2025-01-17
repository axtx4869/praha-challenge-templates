// inafuneさんが作ったテスト用の関数
import axios from "axios";

// テスト1
export const numberFormat = (value: number) => {
  const formatter = new Intl.NumberFormat("jp-JP");
  return formatter.format(value);
};

// テスト2
export const bubbleSort = (arr: number[]) => {
  let noSwaps;

  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }

  return arr;
};

export class ApiService {
  public async fetchUserName(userId: number): Promise<string> {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/" + userId).catch((): never => {
      throw Error("Failed to fetch user.");
    });

    return data.name;
  }
}

// テスト3
export const fetchUserName = async (userId: number, apiService: ApiService): Promise<string> => {
  try {
    return apiService.fetchUserName(userId);
  } catch (error) {
    return "";
  }
};
