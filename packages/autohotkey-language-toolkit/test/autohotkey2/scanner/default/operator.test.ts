import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkey2/constants';
import { scannerModeProfiles } from '../../../../src/autohotkey2';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('operator', () => {
  const scanner = createTokenScanner({ modeProfiles: scannerModeProfiles });

  test.each(expressionOperators)('pass', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.text).toBe(source);
  });

  test.each([
    '<>',
  ])('fail', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token?.text).not.toBe(source);
  });
});
