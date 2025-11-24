import { scannerModeMapForAhk2 } from '../../../../src/autohotkey2';
import { Scanner } from '../../../../src/core/scanner';

describe('string', () => {
  const scanner = new Scanner(scannerModeMapForAhk2);

  describe('double', () => {
    test.each([
      '"text"',
      '"```;`:`{`n`r`b`t`s`v`a`f`""',
    ])('pass', (text) => {
      scanner.initialize(text);
      const token = scanner.scan('default');

      expect(token!.text).toBe(text);
    });
  });

  describe('single', () => {
    test.each([
      '\'text\'',
      '\'```;`:`{`n`r`b`t`s`v`a`f}`\'\'',
    ])('pass', (text) => {
      scanner.initialize(text);
      const token = scanner.scan('default');

      expect(token!.text).toBe(text);
    });
  });
});
