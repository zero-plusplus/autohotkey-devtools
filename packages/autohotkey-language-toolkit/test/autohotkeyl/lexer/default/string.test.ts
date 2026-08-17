import { createSyntaxTokenStream } from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkeyl';

describe('string', () => {
  const stream = createSyntaxTokenStream(spec);

  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
  ])('pass', (source) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.text).toBe(source);
  });
});
