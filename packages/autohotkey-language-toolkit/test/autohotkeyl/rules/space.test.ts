import { spaceTokenRule } from '../../../src/autohotkeyl/rules/space';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('space', () => {
  test.each([
    ' ',
    '   ',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(spaceTokenRule);

    expect(token!.kind).toBe(TokenKind.Space);
    expect(token!.text).toBe(text);
  });
});
