import {
  createSyntaxTokenStream,
  TokenKinds,
} from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkeyl';

describe('default', () => {
  const stream = createSyntaxTokenStream(spec);

  test.each([
    ` = = `,
  ])('pass', (source) => {
    stream.initialize(source);

    let token = stream.read();

    expect(token.kind).toBe(TokenKinds.Equals);
    expect(token.leadingTrivia[0]!.text).toBe(' ');
    expect(token.trailingTrivia[0]!.text).toBe(' ');

    token = stream.read();

    expect(token.kind).toBe(TokenKinds.Equals);
    expect(token.trailingTrivia[0]!.text).toBe(' ');

    token = stream.read();

    expect(token.kind).toBe(TokenKinds.EndOfFile);
    expect(token.trailingTrivia).toHaveLength(0);
  });
});
