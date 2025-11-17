import { linefeedTokenRule } from '../../../src/common/rules/linefeed';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('linefeed', () => {
  test.each([
    '\n',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(linefeedTokenRule);

    expect(token!.kind).toBe(TokenKind.Linefeed);
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
