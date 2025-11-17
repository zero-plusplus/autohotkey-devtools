import { spaceTokenRule } from '../../../src/common/rules/space';
import { Scanner } from '../../../src/core/scanner';

describe('space', () => {
  test.each([
    ' ',
    '   ',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(spaceTokenRule);

    expect(token!.kind).toBe(spaceTokenRule.kind);
    expect(token!.text).toBe(text);
  });
});
