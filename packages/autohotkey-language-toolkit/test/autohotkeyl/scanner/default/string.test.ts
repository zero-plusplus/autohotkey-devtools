import { scannerModeMapForAhkl } from '../../../../src/autohotkeyl';
import { Scanner } from '../../../../src/core/scanner';

describe('string', () => {
  const scanner = new Scanner(scannerModeMapForAhkl);

  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');


    expect(token!.text).toBe(text);
  });
});
