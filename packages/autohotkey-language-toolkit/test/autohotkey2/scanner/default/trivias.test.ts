import { spec } from '../../../../src/autohotkey2/scanner';
import { TokenKinds } from '../../../../src/autohotkeyl/constants';
import { createScanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = createScanner(spec);

  test.each([
    ` = = `,
  ])('pass', (source) => {
    scanner.initialize(source);

    let token = scanner.scan();

    expect(token.kind).toBe(TokenKinds.Equals);
    expect(token.leadingTrivia[0]!.text).toBe(' ');
    expect(token.trailingTrivia[0]!.text).toBe(' ');

    token = scanner.scan();

    expect(token.kind).toBe(TokenKinds.Equals);
    expect(token.trailingTrivia[0]!.text).toBe(' ');

    token = scanner.scan();

    expect(token.kind).toBe(TokenKinds.EndOfFile);
    expect(token.trailingTrivia).toHaveLength(0);
  });
});
