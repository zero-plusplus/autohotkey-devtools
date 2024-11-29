import { timesAsync } from '../../src';

describe('timesAsync', () => {
  test('timesAsync', async() => {
    await expect(timesAsync(2, async() => Promise.resolve(1))).resolves.toStrictEqual([ 1, 1 ]);
  });
});
