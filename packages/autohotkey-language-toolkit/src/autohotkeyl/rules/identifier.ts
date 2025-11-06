import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';

export const identifier: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  const char = peek();
  if (char === undefined) {
    return undefined;
  }

  const charCode = char.codePointAt(0);
  if (charCode === undefined) {
    return undefined;
  }

  if (!identifierHead(charCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; 0 < i; i--) {
    const nextChar = peek();
    if (nextChar === undefined) {
      break;
    }

    const nextCharCode = nextChar.codePointAt(0);
    if (nextCharCode === undefined) {
      break;
    }

    if (!identifierTail(nextCharCode)) {
      break;
    }
    advance();
  }

  return commit('identifier');
};
export const identifierRule: ScannerRule = {
  name: identifier.name,
  scan: identifier,
};

// #region helpers
function alphabed(charCode: number): boolean {
  const _A = 0x0041;
  const _Z = 0x005A;
  if (_A <= charCode && charCode <= _Z) {
    return true;
  }

  const _a = 0x0061;
  const _z = 0x007A;
  if (_a <= charCode && charCode <= _z) {
    return true;
  }
  return false;
}
function fullwidth(charCode: number): boolean {
  const fullWidthStart = 0x10000;
  if (fullWidthStart <= charCode) {
    return true;
  }
  return false;
}
function identifierHead(charCode: number): boolean {
  if (alphabed(charCode)) {
    return true;
  }

  const _underscore = 0x005F;
  if (charCode === _underscore) {
    return true;
  }

  const _atmark = 0x0040;
  if (charCode === _atmark) {
    return true;
  }

  const _hash = 0x0023;
  if (charCode === _hash) {
    return true;
  }

  const _dollar = 0x0024;
  if (charCode === _dollar) {
    return true;
  }

  if (fullwidth(charCode)) {
    return true;
  }
  return false;
}
function identifierTail(charCode: number): boolean {
  if (identifierHead(charCode)) {
    return true;
  }

  const _0 = 0x0030;
  const _9 = 0x0039;
  if (_0 <= charCode && charCode <= _9) {
    return true;
  }
  return false;
}
// #endregion helpers
