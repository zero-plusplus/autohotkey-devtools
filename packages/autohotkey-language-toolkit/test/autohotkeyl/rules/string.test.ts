import { stringRule } from '../../../src/autohotkeyl/rules/string';
import { Scanner } from '../../../src/core/scanner';

describe('string', () => {
  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
    '"`"',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(stringRule);

    expect(token!.text).toBe(text);
  });
});
