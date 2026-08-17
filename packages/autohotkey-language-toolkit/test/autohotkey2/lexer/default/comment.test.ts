import { dedent } from '@zero-plusplus/utilities/src';
import { createSyntaxTokenStream } from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkey2';

describe('default', () => {
  const stream = createSyntaxTokenStream(spec);

  test.each([
    '; comment',
  ])('pass', (source) => {
    stream.initialize(source);
    const token = stream.read();

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
    stream.initialize(source);
    const token = stream.read();

    expect(token.leadingTrivia[0]!.text).toBe(source);
  });
});
