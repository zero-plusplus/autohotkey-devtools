import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkey2/constants';
import { createSyntaxTokenStream } from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkey2';

describe('operator', () => {
  const stream = createSyntaxTokenStream(spec);

  test.each(expressionOperators)('pass', (source) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.text).toBe(source);
  });

  test.each([
    '<>',
  ])('fail', (source) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.text).not.toBe(source);
  });
});
