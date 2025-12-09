import { tokenScanModeProfiles } from '../../../../src/autohotkeyl';
import { createTokenScanner } from '../../../../src/core/scanner';
import { TokenKind } from '../../../../src/core/scanner/constants';

describe('default', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  test.each([
    ` = = `,
  ])('pass', (source) => {
    scanner.initialize({ source });

    let token = scanner.scan();

    expect(token!.kind).toBe(TokenKind.Equals);
    expect(token!.leadingTrivias[0]!.text).toBe(' ');
    expect(token!.trailingTrivias[0]!.text).toBe(' ');

    token = scanner.scan();

    expect(token!.kind).toBe(TokenKind.Equals);
    expect(token!.leadingTrivias[0]!.text).toBe(' ');
    expect(token!.trailingTrivias[0]!.text).toBe(' ');

    token = scanner.scan();

    expect(token!.kind).toBe(TokenKind.EndOfFile);
    expect(token!.leadingTrivias[0]!.text).toBe(' ');
    expect(token!.trailingTrivias).toHaveLength(0);
  });
});
