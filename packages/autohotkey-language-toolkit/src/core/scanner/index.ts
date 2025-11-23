import { isTokenKind } from '../utils';
import type { TokenKind } from './constants';
import type {
  ScanController,
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
    const controller: ScanController = {
      eof: () => {
        return this.#source.length <= currentPosition;
      },
      peek: (offset = 0): string | undefined => {
        return this.#source[currentPosition + offset];
      },
      peekCodePoint: (offset = 0): number | undefined => {
        return this.#source[currentPosition + offset]?.codePointAt(0);
      },
      advance: (offset = 1): void => {
        currentPosition += offset;
      },
      consume: (charOrCode: string | number): boolean => {
        if (typeof charOrCode === 'string' && controller.peek() === charOrCode) {
          controller.advance();
          return true;
        }
        else if (controller.peekCodePoint() === charOrCode) {
          controller.advance();
          return true;
        }
        return false;
      },
      snapshot: (): number => {
        return currentPosition;
      },
      seek: (position: number) => {
        currentPosition = position;
      },
      restore: (): number => {
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

    const token = this.#mode?.behavior(controller);
    return token;
  }
  public initialize(sourceText: string, mode?: ScannerMode): this {
    this.#source = sourceText;
    this.#mode = mode ?? this.#mode;
    this.#position = 0;
    return this;
  }
}

export function scanFromTokenMap(tokenMap: TokenMap, controller: ScanController): Token | undefined {
  const { advance, peekCodePoint } = controller;

  const currentChar = peekCodePoint();
  if (currentChar === undefined) {
    return undefined;
  }

  let tokenSpec = tokenMap[currentChar];
  if (typeof tokenSpec === 'object') {
    const nextChar = peekCodePoint(1);
    if (nextChar && nextChar in tokenSpec) {
      advance();
      return scanFromTokenMap(tokenSpec, controller);
    }

    tokenSpec = tokenSpec[''];
  }

  const token = scanFromTokenSpec(tokenSpec, controller);
  if (token) {
    return token;
  }

  if ('' in tokenMap && tokenMap['']) {
    return scanFromTokenSpec(tokenMap[''], controller);
  }
  return undefined;
}

export function scanFromTokenSpec(tokenSpec: TokenSpec, controller: ScanController): Token | undefined {
  const { advance, commit, restore } = controller;

  if (typeof tokenSpec === 'function') {
    restore();
    return tokenSpec(controller);
  }
  if (isTokenKind(tokenSpec)) {
    advance();
    return commit(tokenSpec);
  }
  return undefined;
}
