import { tokenScanModeProfiles } from '../../../../src/autohotkeyl';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('string', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
  ])('pass', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();


    expect(token!.text).toBe(source);
  });
});
