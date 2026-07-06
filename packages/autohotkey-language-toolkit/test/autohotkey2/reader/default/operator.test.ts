import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkey2/constants';
import { spec } from '../../../../src/autohotkey2/reader';
import { createSyntaxTokenStream } from '../../../../src/core/reader';

describe('operator', () => {
  const scanner = createSyntaxTokenStream(spec);

  test.each(expressionOperators)('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.read();

    expect(token.text).toBe(source);
  });

  test.each([
    '<>',
  ])('fail', (source) => {
    scanner.initialize(source);
    const token = scanner.read();

    expect(token.text).not.toBe(source);
  });
});
