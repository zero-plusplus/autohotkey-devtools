import { times } from '../../src/';

describe('times', () => {
  test('times', () => {
    expect(times(2, () => 1)).toStrictEqual([ 1, 1 ]);
  });
});
