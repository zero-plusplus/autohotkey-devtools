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
      match: (...charsOrCodes) => {
        return charsOrCodes.some((charOrCodes) => {
          if (typeof charOrCodes === 'number') {
            return cursor.peekCodePoint() === charOrCodes;
          }
          return cursor.peek() === charOrCodes;
        });
      },
      peek: (offset = 0) => {
        return this.#text[currentPosition + offset];
      },
      peekCodePoint: (offset = 0) => {
        return this.#text[currentPosition + offset]?.codePointAt(0);
      },
      advance: () => {
        return this.#text[currentPosition++];
      },
      consume: (...charsOrCodes): boolean => {
        if (cursor.match(...charsOrCodes)) {
          cursor.advance();
          return true;
        }
        return false;
      },
      consumeWhile: (...charsOrCodes) => {
        let count = 0;
        while (!cursor.eof()) {
          const isMatch = cursor.consume(...charsOrCodes);
          if (isMatch) {
            cursor.advance();
            count++;
            continue;
          }
          break;
        }
        return count;
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
      commit: (kind: string): Token => {
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
