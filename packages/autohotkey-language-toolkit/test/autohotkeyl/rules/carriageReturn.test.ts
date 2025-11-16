import { carriageReturnTokenRule } from '../../../src/autohotkeyl/rules/carriageReturn';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

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

    expect(scanner.scan(carriageReturnTokenRule)!.kind).toBe(TokenKind.CarriageReturn);
    expect(scanner.scan(carriageReturnTokenRule)!.kind).toBe(TokenKind.CarriageReturn);
    expect(scanner.scan(carriageReturnTokenRule)!.kind).toBe(TokenKind.CarriageReturn);
  });
});
