import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkeyl/constants';
import { spec } from '../../../../src/autohotkeyl/reader';
import { createSyntaxTokenStream } from '../../../../src/core/reader';

describe('default.operator', () => {
  const scanner = createSyntaxTokenStream(spec);

  test.each(expressionOperators)('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.read();

    expect(token.text).toBe(source);
  });
});
