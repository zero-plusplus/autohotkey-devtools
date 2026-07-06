import { endOfFileTokenKind, unknownTokenKind } from './constants';
import type {
  DefaultRawTokenSpec,
  EndOfFileToken,
  Lexer,
  LexicalSpec,
  RawToken,
  RawTokenSpec,
  RawTokenStream,
  RawTokenTable,
  StreamState,
  SyntaxToken,
  SyntaxTokenStream,
  TokenKind,
  TriviaTable,
} from './types';

export function createSyntaxTokenStream(spec: LexicalSpec): SyntaxTokenStream {
  const leadingTriviaTable: TriviaTable = Object.fromEntries(spec.leadingTrivias.map((kind) => [ kind, true ]));
  const trailingTriviaTable: TriviaTable = Object.fromEntries(spec.trailingTrivias.map((kind) => [ kind, true ]));

  // environment
  const state = { source: '', position: 0, flags: 0 };
  let peekedSyntaxTokenCache: SyntaxToken | undefined;
  let nextSyntaxTokenPosition: number | undefined;
  let nextSyntaxTokenFlags: number | undefined;

  // stream phase
  const rawTokenStream = createRawTokenStream(createLexer(state), spec.rawTokenTable);

  return {
    get state(): Readonly<StreamState> {
      return state;
    },
    initialize(source: string, position = 0): SyntaxTokenStream {
      state.source = source;
      state.position = position;
      state.flags = 0;
      rawTokenStream.initialize();

      peekedSyntaxTokenCache = undefined;
      nextSyntaxTokenPosition = undefined;
      nextSyntaxTokenFlags = undefined;

      return this;
    },
    eof(): boolean {
      return rawTokenStream.eof();
    },
    peek(): SyntaxToken {
      if (peekedSyntaxTokenCache) {
        return peekedSyntaxTokenCache;
      }

      const position_backup = state.position;
      const flags_backup = state.flags;

      peekedSyntaxTokenCache = this.read();
      nextSyntaxTokenPosition = state.position;
      nextSyntaxTokenFlags = state.flags;

      state.position = position_backup;
      state.flags = flags_backup;

      return peekedSyntaxTokenCache;
    },
    read(): SyntaxToken {
      if (peekedSyntaxTokenCache !== undefined || nextSyntaxTokenPosition !== undefined || nextSyntaxTokenFlags !== undefined) {
        state.position = nextSyntaxTokenPosition!;
        state.flags = nextSyntaxTokenFlags!;
        const token = peekedSyntaxTokenCache!;

        peekedSyntaxTokenCache = undefined;
        nextSyntaxTokenPosition = undefined;
        nextSyntaxTokenFlags = undefined;
        return token;
      }

      const leadingTrivias = readTriviaTokens(rawTokenStream, leadingTriviaTable);
      const token = rawTokenStream.read();
      const trailingTrivias = readTriviaTokens(rawTokenStream, trailingTriviaTable);

      return emitSyntaxToken(token.kind, token.text, leadingTrivias, trailingTrivias, rawTokenStream.state.flags);
    },
    advance(): SyntaxTokenStream {
      this.read();
      return this;
    },
    consume(expected: TokenKind): boolean {
      if (this.peek().kind === expected) {
        this.advance();
        return true;
      }
      return false;
    },
  };
}

// #region reader phases
// Phase 2
function createRawTokenStream(lexer: Lexer, rootRawTokenTable: RawTokenTable): RawTokenStream {
  let startPosition = lexer.state.position;
  let peekedRawTokenCache: RawToken | undefined;
  let nextRawTokenPosition: number | undefined;

  return {
    get state(): Readonly<StreamState> {
      return lexer.state;
    },
    initialize(): RawTokenStream {
      startPosition = lexer.state.position;
      peekedRawTokenCache = undefined;
      nextRawTokenPosition = undefined;
      return this;
    },
    eof(): boolean {
      return lexer.eof();
    },
    peek(): RawToken {
      if (peekedRawTokenCache) {
        return peekedRawTokenCache;
      }

      peekedRawTokenCache = readRawToken(lexer, rootRawTokenTable);
      nextRawTokenPosition = lexer.state.position;
      lexer.seek(startPosition);

      return peekedRawTokenCache;
    },
    read(): RawToken {
      if (nextRawTokenPosition) {
        const token = peekedRawTokenCache!;
        lexer.seek(nextRawTokenPosition);

        peekedRawTokenCache = undefined;
        nextRawTokenPosition = undefined;
        return token;
      }

      return readRawToken(lexer, rootRawTokenTable);
    },
    advance(): RawTokenStream {
      this.read();
      return this;
    },
    consume(expected: TokenKind): boolean {
      const token = this.peek();
      if (token.kind === expected) {
        this.advance();
        return true;
      }
      return false;
    },
  };
  function readRawToken(lexer: Lexer, rootRawTokenTable: RawTokenTable): RawToken {
    if (peekedRawTokenCache && nextRawTokenPosition) {
      const token = peekedRawTokenCache;
      peekedRawTokenCache = undefined;
      lexer.seek(nextRawTokenPosition);

      return token;
    }

    const currentCodePoint = lexer.peek();
    if (currentCodePoint === 0) {
      return emitEndOfFileToken(lexer.state);
    }

    const startPosition = lexer.state.position;
    const rawToken = readRawTokenBySpec(lexer, rootRawTokenTable);
    if (rawToken === undefined) {
      lexer.advance();
      return emitUnknownToken(startPosition, lexer.state);
    }

    return emitToken(rawToken, startPosition, lexer.state);
  }
  function readRawTokenBySpec(lexer: Lexer, spec: RawTokenSpec, offset = 0): TokenKind | undefined {
    if (typeof spec === 'function') {
      return spec(lexer);
    }

    if (typeof spec === 'object') {
      const nextCodePoint = lexer.peek(offset);
      if (typeof nextCodePoint === 'number' && nextCodePoint in spec) {
        return readRawTokenBySpec(lexer, spec[nextCodePoint], offset + 1);
      }
      return readRawTokenByDefaultSpec(lexer, spec.default, offset);
    }

    lexer.seek(lexer.state.position + offset);
    return spec;
  }
  function readRawTokenByDefaultSpec(lexer: Lexer, spec: DefaultRawTokenSpec, offset = 0): TokenKind | undefined {
    if (typeof spec === 'string') {
      lexer.seek(lexer.state.position + offset);
      return spec;
    }
    return spec(lexer);
  }
}
// Phase 1
function createLexer(state: StreamState): Lexer {
  return {
    get state(): Readonly<StreamState> {
      return state;
    },
    eof(): boolean {
      return state.source.length <= state.position;
    },
    seek(newPosition): Lexer {
      state.position = newPosition;
      return this;
    },
    peek(offset = 0): number {
      const charCode = state.source.charCodeAt(state.position + offset);
      return isNaN(charCode) ? 0 : charCode;
    },
    advance(): Lexer {
      state.position++;
      return this;
    },
    consume(expected: number): boolean {
      if (state.source.codePointAt(state.position) === expected) {
        this.advance();
        return true;
      }
      return false;
    },
  };
}
// #endregion reader phases

// #region helpers
function readTriviaTokens(stream: RawTokenStream, triviaTable: TriviaTable): RawToken[] {
  const trivias: RawToken[] = [];

  while (true) {
    const token = stream.peek();
    if (token.kind in triviaTable) {
      stream.advance();
      trivias.push(token);
      continue;
    }
    break;
  }
  return trivias;
}
function emitSyntaxToken(kind: TokenKind, text: string, leadingTrivias: RawToken[], trailingTrivias: RawToken[], flags = 0): SyntaxToken {
  return {
    kind,
    text,
    flags,
    leadingTrivia: leadingTrivias,
    trailingTrivia: trailingTrivias,
  };
}
function emitToken(kind: TokenKind, startPosition: number, state: StreamState): RawToken {
  return {
    kind,
    text: state.source.slice(startPosition, state.position),
  };
}
function emitEndOfFileToken(state: StreamState): EndOfFileToken {
  return emitToken(endOfFileTokenKind, state.position, state) as EndOfFileToken;
}
function emitUnknownToken(startPosition: number, state: StreamState): EndOfFileToken {
  return emitToken(unknownTokenKind, startPosition, state) as EndOfFileToken;
}
// #endregion helpers
