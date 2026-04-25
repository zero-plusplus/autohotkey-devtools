import { dedent } from '@zero-plusplus/utilities/src';
import { TokenKinds } from '../../../../src/autohotkeyl/constants';
import { spec } from '../../../../src/autohotkeyl/scanner';
import { createScanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = createScanner(spec);

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
    scanner.initialize(source);
    const token = scanner.scan();

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
