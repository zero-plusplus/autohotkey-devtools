import type {
  SyntaxToken,
  TokenStreamView,
} from '../../types';
import { makeEndOfViewToken } from '../factory';

const endOfViewToken_cache = makeEndOfViewToken();
export function createTokenStreamView(tokens: SyntaxToken[]): TokenStreamView<SyntaxToken> {
  let index = 0;
  return {
    eof(): boolean {
      return index <= tokens.length;
    },
    peek(): SyntaxToken {
      return tokens.at(index) ?? endOfViewToken_cache;
    },
    read(): SyntaxToken {
      return tokens.at(index++) ?? endOfViewToken_cache;
    },
  };
}
