import type {
  CharStream,
  DefaultRawTokenSpec,
  RawToken,
  RawTokenSpec,
  RawTokenStream,
  RawTokenTable,
  StreamState,
  TokenKind,
} from '../../types';
import { TokenKinds } from '../constants';
import {
  makeEndOfFileToken,
  makeRawToken,
} from '../factory';

const endOfFileToken = makeEndOfFileToken();
export function createRawTokenStream(stream: CharStream, rootRawTokenTable: RawTokenTable): RawTokenStream {
  let startPosition = stream.state.position;
  let peekedRawTokenCache: RawToken | undefined;
  let nextRawTokenPosition: number | undefined;

  return {
    get state(): Readonly<StreamState> {
      return stream.state;
    },
    initialize(): RawTokenStream {
      startPosition = stream.state.position;
      peekedRawTokenCache = undefined;
      nextRawTokenPosition = undefined;
      return this;
    },
    eof(): boolean {
      return stream.eof();
    },
    peek(): RawToken {
      if (peekedRawTokenCache) {
        return peekedRawTokenCache;
      }

      peekedRawTokenCache = readRawToken(stream, rootRawTokenTable);
      nextRawTokenPosition = stream.state.position;
      stream.seek(startPosition);

      return peekedRawTokenCache;
    },
    read(): RawToken {
      if (nextRawTokenPosition) {
        const token = peekedRawTokenCache!;
        stream.seek(nextRawTokenPosition);

        peekedRawTokenCache = undefined;
        nextRawTokenPosition = undefined;
        return token;
      }

      return readRawToken(stream, rootRawTokenTable);
    },
    consume(expected: TokenKind): boolean {
      const token = this.peek();
      if (token.kind === expected) {
        this.read();
        return true;
      }
      return false;
    },
  };
  function readRawToken(stream: CharStream, rootRawTokenTable: RawTokenTable): RawToken {
    if (peekedRawTokenCache && nextRawTokenPosition) {
      const token = peekedRawTokenCache;
      peekedRawTokenCache = undefined;
      stream.seek(nextRawTokenPosition);

      return token;
    }

    const currentCodePoint = stream.peek();
    if (currentCodePoint === 0) {
      return endOfFileToken;
    }

    const startPosition = stream.state.position;
    const rawToken = readRawTokenBySpec(stream, rootRawTokenTable);
    if (rawToken === undefined) {
      stream.advance();
      return emitUnknownToken(startPosition, stream.state);
    }

    return emitToken(rawToken, startPosition, stream.state);
  }
  function readRawTokenBySpec(stream: CharStream, spec: RawTokenSpec, offset = 0): TokenKind | undefined {
    if (typeof spec === 'function') {
      return spec(stream);
    }

    if (typeof spec === 'object') {
      const nextCodePoint = stream.peek(offset);
      if (typeof nextCodePoint === 'number' && nextCodePoint in spec) {
        return readRawTokenBySpec(stream, spec[nextCodePoint], offset + 1);
      }
      return readRawTokenByDefaultSpec(stream, spec.default, offset);
    }

    stream.seek(stream.state.position + offset);
    return spec;
  }
  function readRawTokenByDefaultSpec(stream: CharStream, spec: DefaultRawTokenSpec, offset = 0): TokenKind | undefined {
    if (typeof spec === 'string') {
      stream.seek(stream.state.position + offset);
      return spec;
    }
    return spec(stream);
  }
}

// #region helpers
function emitToken(kind: TokenKind, startPosition: number, state: StreamState): RawToken {
  return makeRawToken(kind, state.source.slice(startPosition, state.position));
}
function emitUnknownToken(startPosition: number, state: StreamState): RawToken {
  return emitToken(TokenKinds.Unknown, startPosition, state);
}
// #endregion helpers
