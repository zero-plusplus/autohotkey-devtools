import { dotTokenRule } from '../../../src/common/rules/operator/dot';
import { percentTokenRule } from '../../../src/common/rules/operator/percent';
import { plusPlusTokenRule } from '../../../src/common/rules/operator/plusplus';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test('dot', () => {
    const scanner = new Scanner('.');
    const token = scanner.scan(dotTokenRule);

    expect(token!.kind).toBe(dotTokenRule.kind);
    expect(token!.text).toBe('.');
  });

  test('percent', () => {
    const scanner = new Scanner('%');
    const token = scanner.scan(percentTokenRule);

    expect(token!.kind).toBe(percentTokenRule.kind);
    expect(token!.text).toBe('%');
  });

  test('plusplus', () => {
    const scanner = new Scanner('++');
    const token = scanner.scan(plusPlusTokenRule);

    expect(token!.kind).toBe(plusPlusTokenRule.kind);
    expect(token!.text).toBe('++');
  });
});
