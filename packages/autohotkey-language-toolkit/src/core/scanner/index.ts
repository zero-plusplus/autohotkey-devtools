import { isTokenKind } from '../utils';
import type { TokenKind } from './constants';
import type {
  ScanController,
  ScannerModeMap,
  ScannerModeName,
  Token,
  TokenMap,
  TokenSpec,
} from './types';

export class Scanner {
  #source = '';
  #modeMap: ScannerModeMap;
  #position: number;
  readonly #controller: ScanController;

  constructor(modeMap: ScannerModeMap) {
    this.#source = '';
    this.#modeMap = modeMap;
    this.#position = 0;
    this.#controller = createScanController(this, this.#position);
  }
  public get source(): string {
    return this.#source;
  }
  public get position(): number {
    return this.#position;
  }
  public scan(modeName: ScannerModeName = 'default'): Token | undefined {
    const token = this.#modeMap[modeName].behavior(this.#controller);

    this.#position = this.#controller.snapshot();
    return token;
  }
  public initialize(sourceText: string, modeMap?: ScannerModeMap): this {
    this.#source = sourceText;
    this.#modeMap = modeMap ?? this.#modeMap;
    this.#position = 0;
    this.#controller.seek(this.#position);
    return this;
  }
}

export function createScanController(scanner: Scanner, position: number): ScanController {
  let currentPosition = position;
  const controller: ScanController = {
    eof: () => {
      return scanner.source.length <= currentPosition;
    },
    peek: (offset = 0): string | undefined => {
      return scanner.source[currentPosition + offset];
    },
    peekCodePoint: (offset = 0): number | undefined => {
      return scanner.source[currentPosition + offset]?.codePointAt(0);
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
      return currentPosition = scanner.position;
    },
    commit: (kind: TokenKind): Token => {
      const tokenText = scanner.source.slice(scanner.position, currentPosition);

      return {
        kind,
        text: tokenText,
      };
    },
  };
  return controller;
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
