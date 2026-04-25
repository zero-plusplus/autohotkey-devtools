import { spec } from '../../../../src/autohotkeyl/scanner';
import { createScanner } from '../../../../src/core/scanner';

describe('string', () => {
  const scanner = createScanner(spec);

  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
  ])('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.scan();

    expect(token.text).toBe(source);
  });
});
