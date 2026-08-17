import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkeyl/constants';
import { createSyntaxTokenStream } from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkeyl';

describe('default.operator', () => {
  const stream = createSyntaxTokenStream(spec);

  test.each(expressionOperators)('pass', (source) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.text).toBe(source);
  });
});
