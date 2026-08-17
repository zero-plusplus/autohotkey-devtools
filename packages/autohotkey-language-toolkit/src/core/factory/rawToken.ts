import type {
  RawToken,
  TokenKind,
} from '../../types';

export function makeRawToken(kind: TokenKind, text: string): RawToken {
  return {
    kind,
    text,
  };
}
