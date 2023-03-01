const validateArgs = (array: number[]): void => {
  const maxArgsSize = 30;
  array.forEach((num): void => {
    if (typeof num !== 'number') {
      throw Error('Argument is not a number');
    }
  });
  if (array.length > maxArgsSize) {
    throw Error(`Too many args, max is ${maxArgsSize}`);
  }
};

export const add = (...args: number[]): number | string => {
  validateArgs(args);

  const maxResult = 1000;
  let result = 0;
  args.forEach((num): number => (result += num));
  return result > maxResult ? 'too big' : result;
};

export const subtract = (...args: number[]): number | string => {
  validateArgs(args);

  const minResult = 0;
  let result = args[0];
  args.slice(1).forEach((num): number => (result -= num));
  return result < minResult ? 'negative number' : result;
};

export const multiply = (...args: number[]): number | string => {
  validateArgs(args);

  const maxResult = 1000;
  let result = 1;
  args.forEach((num): number => (result *= num));
  return result > maxResult ? 'big big number' : result;
};

export const divide = (...args: number[]): number => {
  validateArgs(args);

  let result = args[0];
  args.slice(1).forEach((num): number => (result /= num));
  return Math.round(result * 10) / 10;
};
