import { numberTokenRule as numberTokenRule_v2 } from '../../../src/autohotkey2/rules/number';
import { identifierTokenRule } from '../../../src/autohotkeyl/rules/identifier';
import { numberTokenRule as numberTokenRule_v1 } from '../../../src/autohotkeyl/rules/number';
import { Scanner } from '../../../src/core/scanner';

describe('number', () => {
  describe.each([
    [ numberTokenRule_v2 ],
    [ numberTokenRule_v1 ],
  ])('integer', (tokenRule) => {
    test.each([
      '123',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(tokenRule);

      expect(token!.kind).toBe(tokenRule.kind);
      expect(token!.text).toBe(text);
    });

    test.each([
      '0123abc',
      '&0123abc',
    ])('fail', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(identifierTokenRule);

      expect(token).toBeUndefined();
    });
  });

  describe.each([
    [ numberTokenRule_v2 ],
    [ numberTokenRule_v1 ],
  ])('float', (tokenRule) => {
    test.each([
      '123.',
      '123.456',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(tokenRule);

      expect(token!.kind).toBe(tokenRule.kind);
      expect(token!.text).toBe(text);
    });
  });

  describe.each([
    [ numberTokenRule_v2 ],
    [ numberTokenRule_v1 ],
  ])('hex', (tokenRule) => {
    test.each([
      '0x',
      '0x123',
      '0x1234567890ABCDEF',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(tokenRule);

      expect(token!.kind).toBe(tokenRule.kind);
      expect(token!.text).toBe(text);
    });

    test.each([
      '0x.456',
      '0x123.456',
      '0x1234567890ABCDEF.ABC',
    ])('fail', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(tokenRule);

      expect(token!.text).not.toBe(text);
    });

    describe.each([
      [ numberTokenRule_v2 ],
      [ numberTokenRule_v1 ],
    ])('scientific notation', () => {
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
        const token = scanner.scan(tokenRule);

        expect(token!.kind).toBe(tokenRule.kind);
        expect(token!.text).toBe(text);
      });

      test.each([
        '123e+10.e',
        '0x123e+10',
      ])('fail', (text) => {
        const scanner = new Scanner(text);
        const token = scanner.scan(tokenRule);

        expect(token!.text).not.toBe(text);
      });
    });
  });
});
