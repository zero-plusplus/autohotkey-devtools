import { defaultScanModeForAhkl } from '../../../../src/autohotkeyl/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('string', () => {
  const scanner = new Scanner('', defaultScanModeForAhkl);

  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();


    expect(token!.text).toBe(text);
  });
});
