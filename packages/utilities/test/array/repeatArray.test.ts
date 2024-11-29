import { repeatArray } from '../../src';

describe('repeatArray', () => {
  test('pass', () => {
    expect(repeatArray(2, [ 1 ])).toStrictEqual([ 1, 1 ]);
    expect(repeatArray(2, [ 1, 2, 3 ])).toStrictEqual([ 1, 2, 3, 1, 2, 3 ]);
  });
});
