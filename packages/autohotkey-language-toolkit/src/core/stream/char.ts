import type {
  CharStream,
  StreamState,
} from '../../types';

export function createCharStream(state: StreamState): CharStream {
  return {
    get state(): Readonly<StreamState> {
      return state;
    },
    eof(): boolean {
      return state.source.length <= state.position;
    },
    seek(newPosition): CharStream {
      state.position = newPosition;
      return this;
    },
    peek(offset = 0): number {
      const charCode = state.source.charCodeAt(state.position + offset);
      return isNaN(charCode) ? 0 : charCode;
    },
    advance(): CharStream {
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
