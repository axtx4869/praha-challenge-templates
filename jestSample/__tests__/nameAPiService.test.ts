import { NameApiService } from '../nameApiService';
import axios from 'axios';

jest.mock('axios');

const axiosGetMock = axios.get as jest.Mock;
describe('nameApiServiceのテスト', () => {
  const nameApiService = new NameApiService();

  it('ランダムに生成されたfirstNameが最大文字数を超過しない場合、firstNameを返す', () => {
    axiosGetMock.mockImplementation(() => {
      return Promise.resolve({
        data: {
          first_name: 'Livy',
        },
      });
    });

    return expect(nameApiService.getFirstName()).resolves.toBe('Livy');
  });

  it('ランダムに生成されたfirstNameが最大文字数を超過する場合エラーを投げる', () => {
    axiosGetMock.mockImplementation(() => {
      return Promise.resolve({
        data: {
          first_name: 'Grace',
        },
      });
    });

    return expect(() => nameApiService.getFirstName()).rejects.toThrow('firstName is too long!');
  });
});
