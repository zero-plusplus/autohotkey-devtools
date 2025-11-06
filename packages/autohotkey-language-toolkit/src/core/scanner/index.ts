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
    let currentPosition = this.#position;
    const cursor: Cursor = {
      peek: () => {
        return this.#text[currentPosition];
      },
      advance: () => {
        return this.#text[currentPosition++];
      },
      snapshot: () => {
        return currentPosition;
      },
      restore: (position: number) => {
        currentPosition = position;
      },
      commit: (kind: string): Token => {
        const firstPosition = this.#position;
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
