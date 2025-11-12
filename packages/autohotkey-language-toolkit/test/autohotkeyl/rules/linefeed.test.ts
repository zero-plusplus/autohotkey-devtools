import { linefeedTokenRule } from '../../../src/autohotkeyl/rules/linefeed';
import { Scanner } from '../../../src/core/scanner';

describe('linefeed', () => {
  test.each([
    '\n',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(linefeedTokenRule);

    expect(token!.text).toBe(text);
  });

  test.each([
    '\n\n\n',
  ])('pass', (text) => {
    const scanner = new Scanner(text);

    expect(scanner.scan(linefeedTokenRule)!.text).toBe('\n');
    expect(scanner.scan(linefeedTokenRule)!.text).toBe('\n');
    expect(scanner.scan(linefeedTokenRule)!.text).toBe('\n');
  });
});
