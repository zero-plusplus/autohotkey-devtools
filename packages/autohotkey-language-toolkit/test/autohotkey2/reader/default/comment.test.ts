import { dedent } from '@zero-plusplus/utilities/src';
import { spec } from '../../../../src/autohotkey2/reader';
import { createSyntaxTokenStream } from '../../../../src/core/reader';

describe('default', () => {
  const tokenStream = createSyntaxTokenStream(spec);

  test.each([
    '; comment',
  ])('pass', (source) => {
    tokenStream.initialize(source);
    const token = tokenStream.read();

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
    tokenStream.initialize(source);
    const token = tokenStream.read();

    expect(token.leadingTrivia[0]!.text).toBe(source);
  });
});
