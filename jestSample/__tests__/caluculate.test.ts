import { add, subtract, multiply, divide } from '../calculate';

describe('add', (): void => {
  it('1と2を渡すと3を返す', (): void => {
    expect(add(1, 2)).toBe(3);
  });

  it('400と600を渡すと1000を返す', (): void => {
    expect(add(400, 600)).toBe(1000);
  });

  it('1000と1を渡すと「too big」という文字列を返す', (): void => {
    expect(add(1000, 1)).toBe('too big');
  });

  it('30個の引数を渡してもエラーにならない', (): void => {
    const args = Array(30).fill(1);
    expect(() => add(...args)).not.toThrow('Too many args, max is 30');
  });

  it('31個の引数を渡すとエラーになる', (): void => {
    const args = Array(31).fill(1);
    expect(() => add(...args)).toThrow('Too many args, max is 30');
  });

  it('引数が数字以外だとエラーになる', (): void => {
    const args = Array(31).fill('string');
    expect(() => add(...args)).toThrow('Argument is not a number');
  });
});

describe('subtract', (): void => {
  it('10と5を渡すと5を返す', (): void => {
    expect(subtract(10, 5)).toBe(5);
  });

  it('2と3を渡すと「negative number」という文字列を返す', (): void => {
    expect(subtract(2, 3)).toBe('negative number');
  });

  it('30個の引数を渡してもエラーにならない', (): void => {
    const args = Array(30).fill(1);
    expect(() => subtract(...args)).not.toThrow('Too many args, max is 30');
  });

  it('31個の引数を渡すとエラーになる', (): void => {
    const args = Array(31).fill(1);
    expect(() => subtract(...args)).toThrow('Too many args, max is 30');
  });

  it('引数が数字以外だとエラーになる', (): void => {
    const args = Array(31).fill('string');
    expect(() => subtract(...args)).toThrow('Argument is not a number');
  });
});

describe('multiply', (): void => {
  it('3と10を渡すと30を返す', (): void => {
    expect(multiply(3, 10)).toBe(30);
  });

  it('1と1001を渡すと「big big number」という文字列を返す', (): void => {
    expect(multiply(1, 1001)).toBe('big big number');
  });

  it('30個の引数を渡してもエラーにならない', (): void => {
    const args = Array(30).fill(1);
    expect(() => multiply(...args)).not.toThrow('Too many args, max is 30');
  });

  it('31個の引数を渡すとエラーになる', (): void => {
    const args = Array(31).fill(1);
    expect(() => multiply(...args)).toThrow('Too many args, max is 30');
  });

  it('引数が数字以外だとエラーになる', (): void => {
    const args = Array(31).fill('string');
    expect(() => multiply(...args)).toThrow('Argument is not a number');
  });
});

describe('divide', (): void => {
  it('6と3を渡すと2を返す', (): void => {
    expect(divide(6, 3)).toBe(2);
  });

  it('20と3を渡すと6.7を返す', (): void => {
    expect(divide(20, 3)).toBe(6.7);
  });

  it('30個の引数を渡してもエラーにならない', (): void => {
    const args = Array(30).fill(1);
    expect(() => divide(...args)).not.toThrow('Too many args, max is 30');
  });

  it('31個の引数を渡すとエラーになる', (): void => {
    const args = Array(31).fill(1);
    expect(() => divide(...args)).toThrow('Too many args, max is 30');
  });

  it('引数が数字以外だとエラーになる', (): void => {
    const args = Array(31).fill('string');
    expect(() => divide(...args)).toThrow('Argument is not a number');
  });
});
