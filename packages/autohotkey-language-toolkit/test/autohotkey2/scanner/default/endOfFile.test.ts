import { dedent } from '@zero-plusplus/utilities/src';
import { tokenScanModeProfiles } from '../../../../src/autohotkey2';
import { createTokenScanner } from '../../../../src/core/scanner';
import { TokenKind } from '../../../../src/core/scanner/constants';

describe('default', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

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
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.kind).toBe(TokenKind.EndOfFile);
    expect(token!.leadingTrivias[0]!.text).toBe(space);
    expect(token!.leadingTrivias[1]!.text).toBe(tab);
    expect(token!.leadingTrivias[2]!.text).toBe(lineComment);
    expect(token!.leadingTrivias[3]!.text).toBe(crlf);
    expect(token!.leadingTrivias[4]!.text).toBe(blockComment);
    expect(token!.leadingTrivias[5]!.text).toBe(lf);
    expect(token!.leadingTrivias[6]!.text).toBe(cr);
  });
});
