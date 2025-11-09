import { identifierTokenRule } from '../../../src/autohotkeyl/rules/identifier';
import { Scanner } from '../../../src/core/scanner';

describe('identifier', () => {
  test.each([
    'abc',
    '_@#$',
    'a0123',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(identifierTokenRule);

    expect(token!.text).toBe(text);
  });

  test.each([
    '0123abc',
    '&0123abc',
  ])('fail', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(identifierTokenRule);

    expect(token).toBeUndefined();
  });

  test.each([
    'abc&',
    'a'.repeat(254),
  ])('fail', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(identifierTokenRule);

    expect(token!.text).not.toBe(text);
  });
});
