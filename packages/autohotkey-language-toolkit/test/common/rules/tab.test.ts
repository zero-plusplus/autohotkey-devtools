import { tabTokenRule } from '../../../src/common/rules/tab';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('tab', () => {
  test.each([
    '\t',
    '\t\t\t',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(tabTokenRule);

    expect(token!.kind).toBe(TokenKind.Tab);
    expect(token!.text).toBe(text);
  });
});
