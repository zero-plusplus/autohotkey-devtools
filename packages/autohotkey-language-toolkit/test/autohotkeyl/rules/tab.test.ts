import { tabTokenRule } from '../../../src/autohotkeyl/rules/tab';
import { Scanner } from '../../../src/core/scanner';

describe('tab', () => {
  test.each([
    '\t',
    '\t\t\t',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(tabTokenRule);

    expect(token!.text).toBe(text);
  });
});
