import { carriageReturnTokenRule } from '../../../src/autohotkeyl/rules/carriageReturn';
import { Scanner } from '../../../src/core/scanner';

describe('carriageReturn', () => {
  test.each([
    '\r',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(carriageReturnTokenRule);

    expect(token!.text).toBe(text);
  });


  test.each([
    '\r\r\r',
  ])('pass', (text) => {
    const scanner = new Scanner(text);

    expect(scanner.scan(carriageReturnTokenRule)!.text).toBe('\r');
    expect(scanner.scan(carriageReturnTokenRule)!.text).toBe('\r');
    expect(scanner.scan(carriageReturnTokenRule)!.text).toBe('\r');
  });
});
