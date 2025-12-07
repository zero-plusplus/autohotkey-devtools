import type { TokenKind } from './constants';

export interface RawToken {
  kind: TokenKind;
  text: string;
}
export type RawTokenScanBehavior = (controller: RawTokenScanController) => RawToken | undefined;
export type RawTokenSpec = TokenKind | RawTokenScanBehavior | RawTokenSpecRegistry | undefined;
export type RawTokenSpecRegistry = {
  [key: string]: RawTokenSpec;
};
export interface RawTokenScanController {
  readonly source: TokenScannerConfig['source'];
  readonly position: TokenScannerConfig['position'];
  eof: () => boolean;
  advance: (offset?: number) => void;
  consume: (charOrCode: string | number) => boolean;
  peek: (offset?: number) => string | undefined;
  peekCodePoint: (offset?: number) => number | undefined;
  seek: (position: number) => this;
  rollback: () => this;
  commit: (kind: TokenKind) => RawToken;
}

export interface Token extends RawToken {
  leadingTrivias: Token[];
  trailingTrivias: Token[];
}
export type TokenScanModeProfileName = 'default'; // | 'text';
export interface TokenScanModeProfile {
  name: TokenScanModeProfileName;
  behavior: RawTokenScanBehavior;
}
export type TokenScanModeProfiles = {
  [key in TokenScanModeProfileName]: TokenScanModeProfile;
};
export interface TokenScannerConfig {
  readonly source?: string;
  readonly position?: number;
  readonly modeName?: TokenScanModeProfileName;
  readonly modeProfiles: TokenScanModeProfiles;
}
export interface TokenScannerContext extends TokenScannerConfig {
  source: string;
  startPosition: number;
  position: number;
  modeName: TokenScanModeProfileName;
  modeProfiles: TokenScanModeProfiles;
  readonly cache: {
    nextRawToken: RawToken | undefined;
    nextTrivias: RawToken[] | undefined;
  };
}
export interface TokenScanner {
  readonly source: TokenScannerContext['source'];
  readonly position: TokenScannerContext['position'];
  setMode: (modeName: TokenScanModeProfileName) => this;
  scan: (modeName?: TokenScanModeProfileName) => Token | undefined;
  peek: (modeName?: TokenScanModeProfileName) => Token | undefined;
  snapshot: () => TokenScannerContext;
  restore: (snapshot: TokenScannerContext) => this;
  initialize: (config: Partial<TokenScannerConfig>) => this;
}
