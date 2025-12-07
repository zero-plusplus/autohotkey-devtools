import { isTokenKind } from '../utils';
import type { TokenKind } from './constants';
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
    scan: (modeName?: TokenScanModeProfileName): Token | undefined => {
      const profile = context.modeProfiles[modeName ?? context.modeName];
      try {
        const rawToken = profile.behavior(controller);
        if (rawToken === undefined) {
          return undefined;
        }

        context.startPosition = controller.position!;
        return {
          ...rawToken,
          leadingTrivias: [],
          trailingTrivias: [],
        };
      }
      catch (e: unknown) {
        if (e instanceof Error) {
          throw Error(`<${profile.name}>\n${e.message}`);
        }
        throw Error(profile.name);
      }
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
  function initialScannerContextByConfig(newConfig: Partial<TokenScannerConfig>): TokenScannerContext {
    return {
      source: newConfig.source ?? '',
      position: newConfig.position ?? 0,
      startPosition: newConfig.position ?? 0,
      modeName: newConfig.modeName ?? 'default',
      modeProfiles: newConfig.modeProfiles ?? config.modeProfiles,
      cache: {
        nextRawToken: undefined,
        nextTrivias: undefined,
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
  const { advance, commit, rollback: restore } = controller;

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
