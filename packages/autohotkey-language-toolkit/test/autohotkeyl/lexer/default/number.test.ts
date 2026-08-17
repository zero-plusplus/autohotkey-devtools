import { createSyntaxTokenStream } from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkeyl';

describe('number', () => {
  const stream = createSyntaxTokenStream(spec);

  describe('integer', () => {
    test.each([
      '0',
      '123',
      '0123',
    ])('pass', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).toBe(source);
    });
  });

  describe('float', () => {
    test.each([
      '123.',
      '123.456',
    ])('pass', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).toBe(source);
    });
  });

  describe('hex', () => {
    test.each([
      '0x',
      '0x123',
      '0x1234567890ABCDEF',
    ])('pass', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).toBe(source);
    });

    test.each([
      '0x.456',
      '0x123.456',
      '0x1234567890ABCDEF.ABC',
    ])('fail', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).not.toBe(source);
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
        stream.initialize(source);
        const token = stream.read();

        expect(token.text).toBe(source);
      });

      test.each([
        '123e+10.e',
        '0x123e+10',
      ])('fail', (source) => {
        stream.initialize(source);
        const token = stream.read();

        expect(token.text).not.toBe(source);
      });
    });
  });
});
