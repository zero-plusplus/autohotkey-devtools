import { defaultScanModeForAhk2 } from '../../../../src/autohotkey2/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('string', () => {
  const scanner = new Scanner('', defaultScanModeForAhk2);

  describe('double', () => {
    test.each([
      '"text"',
      '"```;`:`{`n`r`b`t`s`v`a`f`""',
    ])('pass', (text) => {
      scanner.initialize(text);
      const token = scanner.scan();

      expect(token!.text).toBe(text);
    });
  });

  describe('single', () => {
    test.each([
      '\'text\'',
      '\'```;`:`{`n`r`b`t`s`v`a`f}`\'\'',
    ])('pass', (text) => {
      scanner.initialize(text);
      const token = scanner.scan();

      expect(token!.text).toBe(text);
    });
  });
});
