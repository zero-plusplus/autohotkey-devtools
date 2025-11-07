import { identifierRule } from '../../../src/autohotkeyl/rules/identifier';
import { numberRule } from '../../../src/autohotkeyl/rules/number';
import { Scanner } from '../../../src/core/scanner';

describe('number', () => {
  describe('integer', () => {
    test.each([
      '123',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(numberRule);

      expect(token!.text).toBe(text);
    });

    test.each([
      '0123abc',
      '&0123abc',
    ])('fail', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(identifierRule);

      expect(token).toBeUndefined();
    });
  });

  describe('float', () => {
    test.each([
      '123.',
      '123.456',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(numberRule);

      expect(token!.text).toBe(text);
    });
  });

  describe('hex', () => {
    test.each([
      '0x',
      '0x123',
      '0x1234567890ABCDEF',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(numberRule);

      expect(token!.text).toBe(text);
    });

    test.each([
      '0x.456',
      '0x123.456',
      '0x1234567890ABCDEF.ABC',
    ])('fail', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(numberRule);

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
        const scanner = new Scanner(text);
        const token = scanner.scan(numberRule);

        expect(token!.text).toBe(text);
      });

      test.each([
        '123e+10.e',
        '0x123e+10',
      ])('fail', (text) => {
        const scanner = new Scanner(text);
        const token = scanner.scan(numberRule);

        expect(token!.text).not.toBe(text);
      });
    });
  });
});
