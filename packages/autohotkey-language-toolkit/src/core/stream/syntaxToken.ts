import type {
  LexicalSpec,
  RawToken,
  RawTokenStream,
  StreamState,
  SyntaxToken,
  SyntaxTokenStream,
  TokenKind,
  TriviaTable,
} from '../../types';
import { makeSyntaxToken } from '../factory';
import { createCharStream } from './char';
import { createRawTokenStream } from './rawToken';

export function createSyntaxTokenStream(spec: LexicalSpec): SyntaxTokenStream {
  const leadingTriviaTable: TriviaTable = Object.fromEntries(spec.leadingTrivia.map((kind) => [ kind, true ]));
  const trailingTriviaTable: TriviaTable = Object.fromEntries(spec.trailingTrivia.map((kind) => [ kind, true ]));

  // environment
  const state = { source: '', position: 0, flags: 0 };
  let peekedSyntaxTokenCache: SyntaxToken | undefined;
  let nextSyntaxTokenPosition: number | undefined;
  let nextSyntaxTokenFlags: number | undefined;

  // stream phase
  const rawTokenStream = createRawTokenStream(createCharStream(state), spec.rawTokenTable);

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

      const leadingTrivia = readTriviaTokens(rawTokenStream, leadingTriviaTable);
      const token = rawTokenStream.read();
      const trailingTrivia = readTriviaTokens(rawTokenStream, trailingTriviaTable);

      return makeSyntaxToken(token.kind, token.text, leadingTrivia, trailingTrivia, rawTokenStream.state.flags);
    },
    advance(): SyntaxTokenStream {
      this.read();
      return this;
    },
    consume(expected: TokenKind): boolean {
      if (this.peek().kind === expected) {
        this.read();
        return true;
      }
      return false;
    },
  };
}

// #region helpers
function readTriviaTokens(stream: RawTokenStream, triviaTable: TriviaTable): RawToken[] {
  const trivias: RawToken[] = [];

  while (true) {
    const token = stream.peek();
    if (token.kind in triviaTable) {
      stream.read();
      trivias.push(token);
      continue;
    }
    break;
  }
  return trivias;
}
// #endregion helpers
