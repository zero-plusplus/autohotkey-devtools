import { spaceRule } from '../../../src/autohotkeyl/rules/space';
import { Scanner } from '../../../src/core/scanner';

describe('space', () => {
  test.each([
    ' ',
    '   ',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(spaceRule);

    expect(token!.text).toBe(text);
  });
});
