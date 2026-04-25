import { dedent } from '@zero-plusplus/utilities/src';
import { spec } from '../../../../src/autohotkeyl/scanner';
import { createScanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = createScanner(spec);

  test.each([
    '; comment',
  ])('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.scan();

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
    const token = scanner.scan();

    expect(token.leadingTrivia[0]!.text).toBe(source);
  });
});
