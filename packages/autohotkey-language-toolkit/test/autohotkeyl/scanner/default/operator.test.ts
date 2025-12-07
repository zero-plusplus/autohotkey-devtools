import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkeyl/constants';
import { tokenScanModeProfiles } from '../../../../src/autohotkeyl';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('default.operator', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  test.each(expressionOperators)('pass', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token?.text).toBe(source);
  });
});
