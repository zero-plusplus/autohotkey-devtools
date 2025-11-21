import { isTokenKind } from '../utils';
import type { TokenKind } from './constants';
import type {
  Cursor,
  ScannerMode,
  Token,
  TokenMap,
  TokenSpec,
} from './types';

export class Scanner {
  #source: string;
  #mode: ScannerMode | undefined;
  #position: number;

  constructor(sourceText = '', mode?: ScannerMode) {
    this.#source = sourceText;
    this.#mode = mode;
    this.#position = 0;
  }
  public scan(): Token | undefined {
    const firstPosition = this.#position;

    let currentPosition = firstPosition;
    const cursor: Cursor = {
      eof: () => {
        return this.#source.length <= currentPosition;
      },
      peek: (offset = 0) => {
        return this.#source[currentPosition + offset];
      },
      peekCodePoint: (offset = 0) => {
        return this.#source[currentPosition + offset]?.codePointAt(0);
      },
      advance: (offset = 1) => {
        currentPosition += offset;
        return this.#source[currentPosition];
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
        return currentPosition = firstPosition;
      },
      commit: (kind: TokenKind): Token => {
        const lastPosition = currentPosition;
        const tokenText = this.#source.slice(firstPosition, lastPosition);

        this.#position = lastPosition;
        return {
          kind,
          text: tokenText,
        };
      },
    };

    const token = this.#mode?.behavior(cursor);
    return token;
  }
  public initialize(sourceText: string, mode?: ScannerMode): this {
    this.#source = sourceText;
    this.#mode = mode ?? this.#mode;
    this.#position = 0;
    return this;
  }
}

export function scanFromTokenMap(tokenMap: TokenMap, cursor: Cursor): Token | undefined {
  const currentChar = cursor.peekCodePoint();
  if (currentChar === undefined) {
    return undefined;
  }

  let tokenSpec = tokenMap[currentChar];
  if (typeof tokenSpec === 'object') {
    const nextChar = cursor.peekCodePoint(1);
    if (nextChar && nextChar in tokenSpec) {
      cursor.advance();
      return scanFromTokenMap(tokenSpec, cursor);
    }

    tokenSpec = tokenSpec[''];
  }

  const token = scanFromTokenSpec(tokenSpec, cursor);
  if (token) {
    return token;
  }

  if ('' in tokenMap && tokenMap['']) {
    return scanFromTokenSpec(tokenMap[''], cursor);
  }
  return undefined;
}

export function scanFromTokenSpec(tokenSpec: TokenSpec, cursor: Cursor): Token | undefined {
  if (typeof tokenSpec === 'function') {
    cursor.restore();
    return tokenSpec(cursor);
  }
  if (isTokenKind(tokenSpec)) {
    cursor.advance();
    return cursor.commit(tokenSpec);
  }
  return undefined;
}
