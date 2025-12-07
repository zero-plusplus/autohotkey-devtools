import { dedent } from '@zero-plusplus/utilities/src';
import { tokenScanModeProfiles } from '../../../../src/autohotkey2';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  test.each([
    '; comment',
  ])('pass', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.text).toBe(source);
  });

  test.each([
    '/**/',
    '/*  */',
    dedent`
      /*
      */
    `,
  ])('pass', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.text).toBe(source);
  });
});
