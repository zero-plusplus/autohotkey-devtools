import { spec } from '../../../../src/autohotkeyl/reader';
import { createSyntaxTokenStream } from '../../../../src/core/reader';

describe('string', () => {
  const scanner = createSyntaxTokenStream(spec);

  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
  ])('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.read();

    expect(token.text).toBe(source);
  });
});
