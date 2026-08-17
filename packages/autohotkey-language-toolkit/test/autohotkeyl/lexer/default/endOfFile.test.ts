import { dedent } from '@zero-plusplus/utilities/src';
import {
  createSyntaxTokenStream,
  TokenKinds,
} from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkeyl';

describe('default', () => {
  const stream = createSyntaxTokenStream(spec);

  const space = '  ';
  const tab = '\t\t';
  const lineComment = '; comment';
  const lf = '\n';
  const cr = '\r';
  const crlf = '\r\n';
  const blockComment = dedent`
    /*
     *
     */
  `;

  test.each([
    `${space}${tab}${lineComment}${crlf}${blockComment}${lf}${cr}`,
  ])('pass', (source) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.kind).toBe(TokenKinds.EndOfFile);
    expect(token.leadingTrivia[0]!.text).toBe(space);
    expect(token.leadingTrivia[1]!.text).toBe(tab);
    expect(token.leadingTrivia[2]!.text).toBe(lineComment);
    expect(token.leadingTrivia[3]!.text).toBe(crlf);
    expect(token.leadingTrivia[4]!.text).toBe(blockComment);
    expect(token.leadingTrivia[5]!.text).toBe(lf);
    expect(token.leadingTrivia[6]!.text).toBe(cr);
  });
});
