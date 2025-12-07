import { tokenScanModeProfiles } from '../../../../src/autohotkeyl';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('number', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  describe('integer', () => {
    test.each([
      '0',
      '123',
      '0123',
    ])('pass', (source) => {
      scanner.initialize({ source });
      const token = scanner.scan();

      expect(token!.text).toBe(source);
    });
  });

  describe('float', () => {
    test.each([
      '123.',
      '123.456',
    ])('pass', (source) => {
      scanner.initialize({ source });
      const token = scanner.scan();

      expect(token!.text).toBe(source);
    });
  });

  describe('hex', () => {
    test.each([
      '0x',
      '0x123',
      '0x1234567890ABCDEF',
    ])('pass', (source) => {
      scanner.initialize({ source });
      const token = scanner.scan();

      expect(token!.text).toBe(source);
    });

    test.each([
      '0x.456',
      '0x123.456',
      '0x1234567890ABCDEF.ABC',
    ])('fail', (source) => {
      scanner.initialize({ source });
      const token = scanner.scan();

      expect(token!.text).not.toBe(source);
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
      ])('pass', (source) => {
        scanner.initialize({ source });
        const token = scanner.scan();

        expect(token!.text).toBe(source);
      });

      test.each([
        '123e+10.e',
        '0x123e+10',
      ])('fail', (source) => {
        scanner.initialize({ source });
        const token = scanner.scan();

        expect(token!.text).not.toBe(source);
      });
    });
  });
});
