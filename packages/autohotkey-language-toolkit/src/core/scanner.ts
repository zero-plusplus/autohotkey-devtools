import {
  mergeFlags,
} from '@zero-plusplus/utilities/src';
import type {
  DefaultTokenSpec,
  EndOfFileToken,
  LexerContext,
  LexerSnapshot,
  LexicalSpec,
  Scanner,
  ScannerContext,
  SyntaxToken,
  Token,
  TokenKind,
  TokenSpec,
  TriviaTable,
} from './types';

export function createEndOfFileToken(): EndOfFileToken {
  return {
    kind: 'EndOfFile',
    text: '',
  };
}
export function createScannerContext(source: string, initialPosition: number, spec: LexicalSpec): ScannerContext<Token> {
  const sourceLength = source.length;

  // states
  let startPosition = initialPosition;
  let currentPosition = startPosition;
  let flags = 0;

  const lexer = createLexerContext();
  return createScannerContext(lexer);

  // #region helpers
  function commitToken(kind: TokenKind | undefined): Token {
    if (kind === undefined) {
      return createEndOfFileToken();
    }

    const tokenStartPosition = startPosition;
    const tokenEndPosition = currentPosition;
    startPosition = tokenEndPosition;
    flags = 0;

    return {
      kind,
      text: source.slice(tokenStartPosition, tokenEndPosition),
    };
  }
  function createLexerContext(): LexerContext {
    return {
      get source(): string {
        return source;
      },
      get startPosition(): number {
        return startPosition;
      },
      get currentPosition(): number {
        return currentPosition;
      },
      get flags(): number {
        return flags;
      },
      hasNotAdvanced(): boolean {
        return this.startPosition === this.currentPosition;
      },
      eof(): boolean {
        return sourceLength <= this.currentPosition;
      },
      peek(offset = 0): string | undefined {
        const char = source.charAt(this.currentPosition + offset);
        return char === '' ? undefined : char;
      },
      peekCodePoint(offset = 0): number | undefined {
        const charCode = source.charCodeAt(this.currentPosition + offset);
        return isNaN(charCode) ? undefined : charCode;
      },
      advance(): LexerContext {
        currentPosition++;
        return this;
      },
      advanceBy(n: number): LexerContext {
        for (let i = n; i--;) {
          currentPosition++;
        }
        return this;
      },
      seek(newPosition): LexerContext {
        currentPosition = newPosition;
        return this;
      },
      consume(expected: number): boolean {
        if (source.codePointAt(this.currentPosition) === expected) {
          this.advance();
          return true;
        }
        return false;
      },
      addFlag(flag: number): LexerContext {
        flags = mergeFlags(flags, flag);
        return this;
      },
      snapshot(): LexerSnapshot {
        return {
          currentPosition: this.currentPosition,
          flags: this.flags,
        };
      },
      restore(snapshot: LexerSnapshot): LexerContext {
        currentPosition = snapshot.currentPosition;
        flags = snapshot.flags;

        return this;
      },
      rollback(): LexerContext {
        currentPosition = startPosition;
        flags = 0;

        return this;
      },
    };
  }
  function createScannerContext(ctx: LexerContext): ScannerContext<Token> {
    let peekedTokenCache: Token | undefined;
    let nextTokenPosition: number | undefined;

    return {
      get source(): string {
        return ctx.source;
      },
      get position(): number {
        return ctx.currentPosition;
      },
      peek(): Token {
        if (peekedTokenCache) {
          return peekedTokenCache;
        }

        const snapshot = ctx.snapshot();
        peekedTokenCache = this.scan();
        nextTokenPosition = ctx.currentPosition;

        this.restore(snapshot);

        return peekedTokenCache;
      },
      scan(): Token {
        if (peekedTokenCache && nextTokenPosition) {
          const token = peekedTokenCache;
          peekedTokenCache = undefined;
          ctx.seek(nextTokenPosition);

          return token;
        }

        const currentCodePoint = ctx.peekCodePoint();
        if (currentCodePoint === undefined) {
          return createEndOfFileToken();
        }
        return commitToken(scanByTokenSpec(ctx, spec.tokenTable));
      },
      tryScan(callback): void {
        const snapshot = ctx.snapshot();

        const isApply = callback();
        if (!isApply) {
          ctx.restore(snapshot);
        }
        peekedTokenCache = undefined;
      },
      snapshot(): LexerSnapshot {
        return ctx.snapshot();
      },
      restore(snapshot): ScannerContext<Token> {
        ctx.restore(snapshot);
        return this;
      },
    };
    function scanByTokenSpec(ctx: LexerContext, spec: TokenSpec, offset = 0): TokenKind | undefined {
      if (typeof spec === 'function') {
        return spec(ctx);
      }

      if (typeof spec === 'object') {
        const nextCodePoint = ctx.peekCodePoint(offset);
        if (typeof nextCodePoint === 'number' && nextCodePoint in spec) {
          return scanByTokenSpec(ctx, spec[nextCodePoint], offset + 1);
        }
        return scanByDefaultTokenSpec(ctx, spec.default, offset);
      }

      ctx.advanceBy(offset);
      return spec;
    }
    function scanByDefaultTokenSpec(ctx: LexerContext, spec: DefaultTokenSpec, offset = 0): TokenKind | undefined {
      if (typeof spec === 'string') {
        ctx.advanceBy(offset);
        return spec;
      }

      for (const lexer of spec) {
        const kind = lexer(ctx);
        if (kind) {
          return kind;
        }
        ctx.rollback();
      }
      return undefined;
    }
  }
  // #endregion helpers
}

export function createScanner(spec: LexicalSpec): Scanner {
  const leadingTriviaTable: TriviaTable = Object.fromEntries(spec.leadingTrivias.map((kind) => [ kind, true ]));
  const trailingTriviaTable: TriviaTable = Object.fromEntries(spec.trailingTrivias.map((kind) => [ kind, true ]));

  // environment
  let ctx: ScannerContext<Token>;
  let peekedTokenCache: SyntaxToken | undefined;
  let nextTokenSnapshot: LexerSnapshot | undefined;

  return {
    get source(): string {
      return ctx.source;
    },
    get position(): number {
      return ctx.position;
    },
    initialize(newSource: string, position = 0): Scanner {
      ctx = createScannerContext(newSource, position, spec);
      return this;
    },
    peek(): SyntaxToken | undefined {
      if (peekedTokenCache) {
        return peekedTokenCache;
      }

      const snapshot = this.snapshot();
      peekedTokenCache = this.scan();
      nextTokenSnapshot = this.snapshot();

      this.restore(snapshot);
      return peekedTokenCache;
    },
    scan(): SyntaxToken {
      if (peekedTokenCache && nextTokenSnapshot) {
        const token = peekedTokenCache;
        peekedTokenCache = undefined;
        this.restore(nextTokenSnapshot);
        return token;
      }

      const leadingTrivias = scanTriviaTokens(leadingTriviaTable);
      const token = ctx.scan();
      const trailingTrivias = scanTriviaTokens(trailingTriviaTable);

      return emitSyntaxToken(token.kind, token.text, leadingTrivias, trailingTrivias);
    },
    tryScan(callback): void {
      const snapshot = ctx.snapshot();
      const isApply = callback();
      if (isApply) {
        return;
      }
      ctx.restore(snapshot);
    },
    snapshot(): LexerSnapshot {
      return ctx.snapshot();
    },
    restore(snapshot): Scanner {
      ctx.restore(snapshot);
      return this;
    },
  };

  // #region helpers
  function emitSyntaxToken(kind: TokenKind, text: string, leadingTrivias: Token[], trailingTrivias: Token[]): SyntaxToken {
    return {
      kind,
      text,
      leadingTrivia: leadingTrivias,
      trailingTrivia: trailingTrivias,
    };
  }
  function scanTriviaTokens(triviaTable: TriviaTable): Token[] {
    const trivias: Token[] = [];

    while (true) {
      const token = ctx.peek();
      if (token && token.kind in triviaTable) {
        ctx.scan();
        trivias.push(token);
        continue;
      }
      break;
    }
    return trivias;
  }
// #endregion
}

