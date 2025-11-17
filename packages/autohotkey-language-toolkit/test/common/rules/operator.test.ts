import { dotTokenRule } from '../../../src/common/rules/operator/dot';
import { percentTokenRule } from '../../../src/common/rules/operator/percent';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test('percent', () => {
    const scanner = new Scanner('%');
    const token = scanner.scan(percentTokenRule);

    expect(token!.kind).toBe(percentTokenRule.kind);
    expect(token!.text).toBe('%');
  });

  test('dot', () => {
    const scanner = new Scanner('.');
    const token = scanner.scan(dotTokenRule);

    expect(token!.kind).toBe(dotTokenRule.kind);
    expect(token!.text).toBe('.');
  });
});
