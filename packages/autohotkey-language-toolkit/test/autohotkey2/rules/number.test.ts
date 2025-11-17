import { numberTokenRule } from '../../../src/autohotkey2/rules/number';
import { Scanner } from '../../../src/core/scanner';

describe('number', () => {
  test.each([
    '123',
  ])('integer', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(numberTokenRule);

    expect(token!.kind).toBe(numberTokenRule.kind);
    expect(token!.text).toBe(text);
  });
});
