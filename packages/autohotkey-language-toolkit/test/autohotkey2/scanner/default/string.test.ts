import { scannerModeProfiles } from '../../../../src/autohotkey2';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('string', () => {
  const scanner = createTokenScanner({ modeProfiles: scannerModeProfiles });

  describe('double', () => {
    test.each([
      '"text"',
      '"```;`:`{`n`r`b`t`s`v`a`f`""',
    ])('pass', (source) => {
      scanner.initialize({ source });
      const token = scanner.scan();

      expect(token!.text).toBe(source);
    });
  });

  describe('single', () => {
    test.each([
      '\'text\'',
      '\'```;`:`{`n`r`b`t`s`v`a`f}`\'\'',
    ])('pass', (source) => {
      scanner.initialize({ source });
      const token = scanner.scan();

      expect(token!.text).toBe(source);
    });
  });
});
