import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkeyl/constants';
import { scannerModeProfiles } from '../../../../src/autohotkeyl';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('default.operator', () => {
  const scanner = createTokenScanner({ modeProfiles: scannerModeProfiles });

  test.each(expressionOperators)('pass', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token?.text).toBe(source);
  });
});
