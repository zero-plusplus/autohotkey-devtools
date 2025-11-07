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
      peek: () => {
        return this.#text[currentPosition];
      },
      peekCodePoint: () => {
        return this.#text[currentPosition]?.codePointAt(0);
      },
      advance: () => {
        return this.#text[currentPosition++];
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
