import { times } from '../../src/';

describe('times', () => {
  test('times', () => {
    const result: number[] = [];
    times(2, (index) => {
      result.push(index);
    });

    expect(result).toStrictEqual([ 0, 1 ]);
  });

  test('stop repeating', () => {
    const result: number[] = [];
    times(2, (i, { stop }) => {
      result.push(i);
      return stop();
    });

    expect(result).toStrictEqual([ 0 ]);
  });
});
