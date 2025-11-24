import { scannerModeMapForAhk2 } from '../../../../src/autohotkey2';
import { Scanner } from '../../../../src/core/scanner';

describe('number', () => {
  const scanner = new Scanner(scannerModeMapForAhk2);

  describe('integer', () => {
    test.each([
      '0',
      '123',
      '0123',
    ])('pass', (text) => {
      scanner.initialize(text);
      const token = scanner.scan('default');

      expect(token!.text).toBe(text);
    });
  });

  describe('float', () => {
    test.each([
      '123.',
      '123.456',
    ])('pass', (text) => {
      scanner.initialize(text);
      const token = scanner.scan('default');

      expect(token!.text).toBe(text);
    });
  });

  describe('hex', () => {
    test.each([
      '0x',
      '0x123',
      '0x1234567890ABCDEF',
    ])('pass', (text) => {
      scanner.initialize(text);
      const token = scanner.scan('default');

      expect(token!.text).toBe(text);
    });

    test.each([
      '0x.456',
      '0x123.456',
      '0x1234567890ABCDEF.ABC',
    ])('fail', (text) => {
      scanner.initialize(text);
      const token = scanner.scan('default');

      expect(token!.text).not.toBe(text);
    });

    describe('scientific notation', () => {
      test.each([
        '123e10',
        '123E10',
        '123e+10',
        '123E+10',
        '123e-10',
        '123E-10',

        '123.123e10',
        '123.123E10',
        '123.123e+10',
        '123.123E+10',
        '123.123e-10',
        '123.123E-10',
      ])('pass', (text) => {
        scanner.initialize(text);
        const token = scanner.scan('default');

        expect(token!.text).toBe(text);
      });

      test.each([
        '123e+10.e',
        '0x123e+10',
      ])('fail', (text) => {
        scanner.initialize(text);
        const token = scanner.scan('default');

        expect(token!.text).not.toBe(text);
      });
    });
  });
});
