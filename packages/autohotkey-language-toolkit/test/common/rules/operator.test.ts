import { percentTokenRule } from '../../../src/common/rules/operator/percent';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('operator', () => {
  test('percent', () => {
    const scanner = new Scanner('%');
    const token = scanner.scan(percentTokenRule);

    expect(token!.kind).toBe(TokenKind.Percent);
    expect(token!.text).toBe('%');
  });
});
