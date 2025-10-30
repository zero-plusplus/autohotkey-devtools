import { timesAsync } from '../../src';

describe('timesAsync', () => {
  test('timesAsync', async() => {
    const result: number[] = [];
    await timesAsync(2, async(i) => {
      result.push(i);
      return Promise.resolve();
    });

    expect(result).toStrictEqual([ 0, 1 ]);
  });

  test('stop repeating', async() => {
    const result: number[] = [];
    await timesAsync(2, async(i, { stop }) => {
      result.push(i);
      return Promise.resolve(stop());
    });

    expect(result).toStrictEqual([ 0 ]);
  });
});
