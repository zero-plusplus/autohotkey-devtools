import { isTokenKind } from '../utils';
import { TokenKind } from './constants';
import type {
  RawToken,
  RawTokenScanController,
  RawTokenSpec,
  RawTokenSpecRegistry,
  Token,
  TokenScanModeProfileName,
  TokenScanner,
  TokenScannerConfig,
  TokenScannerContext,
} from './types';

export function createTokenScanner(config: TokenScannerConfig): TokenScanner {
  let context: TokenScannerContext = initialScannerContextByConfig(config);
  const controller: RawTokenScanController = createRawTokenScanController();

  const scanner: TokenScanner = {
    get source(): string {
      return context.source;
    },
    get position(): number {
      return context.position;
    },
    initialize: (newConfig: Partial<TokenScannerConfig>): TokenScanner => {
      context = initialScannerContextByConfig(newConfig);
      return scanner;
    },
    setMode: (modeName: TokenScanModeProfileName) => {
      context.modeName = modeName;
      return scanner;
    },
    scan: (tempModeName?: TokenScanModeProfileName): Token | undefined => {
      const modeName = tempModeName ?? context.modeName;
      const leadingTrivias = consumeCachedLeadingTrivias() ?? scanTrivias(modeName);

      let rawToken = scanRawToken(modeName);
      if (rawToken === undefined) {
        if (!controller.eof()) {
          return undefined;
        }

        rawToken = controller.commit(TokenKind.EndOfFile);
      }
      const trailingTrivias = scanTrivias(modeName);

      context.startPosition = controller.position!;
      return {
        ...rawToken,
        leadingTrivias,
        trailingTrivias,
      };
    },
    peek: (modeName?: TokenScanModeProfileName): Token | undefined => {
      const snapshot = scanner.snapshot();
      const token = scanner.scan(modeName);

      scanner.restore(snapshot);
      return token;
    },
    snapshot: (): TokenScannerContext => {
      return {
        ...context,
        cache: {
          ...context.cache,
        },
      };
    },
    restore: (snapshot: TokenScannerContext) => {
      context = snapshot;
      return scanner;
    },
  };

  return scanner;

  // #region helpers
  function scanRawToken(modeName: TokenScanModeProfileName): RawToken | undefined {
    if (context.cache.nextRawToken) {
      return consumeCachedRawToken();
    }

    context.startPosition = context.position;
    const profile = context.modeProfiles[modeName];
    try {
      const rawToken = profile.behavior(controller);
      if (rawToken?.kind === TokenKind.Identifier) {
        const keywordKind = config.modeProfiles[modeName].identifierClassificationMap[rawToken.text.toLowerCase()];
        if (keywordKind !== undefined) {
          return {
            ...rawToken,
            kind: keywordKind,
          };
        }
      }
      return rawToken;
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw Error(`<${profile.name}>\n${e.message}`);
      }
      throw Error(profile.name);
    }
  }
  function scanTrivias(modeName: TokenScanModeProfileName): RawToken[] {
    const trivias: RawToken[] = [];
    while (true) {
      const rawToken = peekRawToken(modeName);
      if (rawToken === undefined) {
        break;
      }

      if (!isTrivia(rawToken.kind, modeName)) {
        break;
      }
      trivias.push(scanRawToken(modeName)!);
    }

    context.cache.nextLeadingTrivias = trivias;
    return trivias;
  }
  function peekRawToken(modeName: TokenScanModeProfileName): RawToken | undefined {
    if (context.cache.nextRawToken) {
      return context.cache.nextRawToken;
    }

    context.cache.nextRawToken = scanRawToken(modeName);
    controller.rollback();
    return context.cache.nextRawToken;
  }
  function consumeCachedRawToken(): RawToken | undefined {
    if (context.cache.nextRawToken === undefined) {
      return undefined;
    }

    const rawToken = context.cache.nextRawToken;
    controller.seek(controller.position + rawToken.text.length);
    context.cache.nextRawToken = undefined;
    return rawToken;
  }
  function consumeCachedLeadingTrivias(): RawToken[] | undefined {
    if (context.cache.nextLeadingTrivias === undefined) {
      return undefined;
    }

    const trivias = context.cache.nextLeadingTrivias;
    context.cache.nextLeadingTrivias = undefined;
    return trivias;
  }
  function isTrivia(kind: TokenKind, modeName: TokenScanModeProfileName): boolean {
    return config.modeProfiles[modeName].triviaClassification[kind] ?? false;
  }
  function initialScannerContextByConfig(newConfig: Partial<TokenScannerConfig>): TokenScannerContext {
    return {
      source: newConfig.source ?? '',
      position: newConfig.position ?? 0,
      startPosition: newConfig.position ?? 0,
      modeName: newConfig.modeName ?? 'default',
      modeProfiles: newConfig.modeProfiles ?? config.modeProfiles,
      cache: {
        nextRawToken: undefined,
        nextLeadingTrivias: undefined,
      },
    };
  }
  function createRawTokenScanController(): RawTokenScanController {
    const controller: RawTokenScanController = {
      get source(): string {
        return context.source;
      },
      get position(): number {
        return context.position;
      },
      eof: () => {
        return context.source.length <= context.position;
      },
      peek: (offset = 0): string | undefined => {
        return context.source[context.position + offset];
      },
      peekCodePoint: (offset = 0): number | undefined => {
        return context.source[context.position + offset]?.codePointAt(0);
      },
      advance: (offset = 1): void => {
        context.position += offset;
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
      seek: (position: number): RawTokenScanController => {
        context.position = position;
        return controller;
      },
      rollback: (): RawTokenScanController => {
        context.position = context.startPosition;
        return controller;
      },
      commit: (kind: TokenKind): RawToken => {
        const tokenText = context.source.slice(context.startPosition, context.position);

        return {
          kind,
          text: tokenText,
        };
      },
    };
    return controller;
  }
  // #endregion helpers
}
export function scanFromTokenMap(registry: RawTokenSpecRegistry, controller: RawTokenScanController): RawToken | undefined {
  const { advance, peekCodePoint } = controller;

  const currentChar = peekCodePoint();
  if (currentChar === undefined) {
    return undefined;
  }

  let tokenSpec = registry[currentChar];
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

  if ('' in registry && registry['']) {
    return scanFromTokenSpec(registry[''], controller);
  }
  return undefined;
}

export function scanFromTokenSpec(tokenSpec: RawTokenSpec, controller: RawTokenScanController): RawToken | undefined {
  const { advance, commit, rollback } = controller;

  if (typeof tokenSpec === 'function') {
    rollback();
    return tokenSpec(controller);
  }
  if (isTokenKind(tokenSpec)) {
    advance();
    return commit(tokenSpec);
  }
  return undefined;
}
