import type { TokenKind } from './constants';
import type {
  Cursor,
  ScannerRule,
  Token,
} from './types';

export class Scanner {
  readonly #text: string;
  #position: number;

  constructor(text: string) {
    this.#text = text;
    this.#position = 0;
  }
  public scan(rule: ScannerRule): Token | undefined {
    const firstPosition = this.#position;

    let currentPosition = firstPosition;
    const cursor: Cursor = {
      eof: () => {
        return this.#text.length <= currentPosition;
      },
      peek: (offset = 0) => {
        return this.#text[currentPosition + offset];
      },
      peekCodePoint: (offset = 0) => {
        return this.#text[currentPosition + offset]?.codePointAt(0);
      },
      advance: (offset = 1) => {
        currentPosition += offset;
        return this.#text[currentPosition];
      },
      consume: (charOrCode): boolean => {
        if (typeof charOrCode === 'string' && cursor.peek() === charOrCode) {
          cursor.advance();
          return true;
        }
        else if (cursor.peekCodePoint() === charOrCode) {
          cursor.advance();
          return true;
        }
        return false;
      },
      snapshot: () => {
        return currentPosition;
      },
      seek: (position: number) => {
        currentPosition = position;
      },
      restore: () => {
        return this.#position = firstPosition;
      },
      commit: (kind: TokenKind): Token => {
        const firstPosition = cursor.restore();
        const lastPosition = currentPosition;
        const tokenText = this.#text.slice(firstPosition, lastPosition);

        this.#position = lastPosition;
        return {
          kind,
          text: tokenText,
        };
      },
    };

    const token = rule.scan(cursor);
    return token;
  }
}
