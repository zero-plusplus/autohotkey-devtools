import { dedent } from '@zero-plusplus/utilities/src';
import { spec } from '../../../../src/autohotkeyl/reader';
import { createSyntaxTokenStream } from '../../../../src/core/reader';

describe('default', () => {
  const scanner = createSyntaxTokenStream(spec);

  test.each([
    '; comment',
  ])('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.read();

    expect(token.leadingTrivia[0]!.text).toBe(source);
  });

  test.each([
    '/**/',
    '/*  */',
    dedent`
      /*
      */
    `,
  ])('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.read();

    expect(token.leadingTrivia[0]!.text).toBe(source);
  });
});
