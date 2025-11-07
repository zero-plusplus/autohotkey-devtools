export function isAlphaCharCode(charCode: number | undefined): charCode is number {
  if (charCode === undefined) {
    return false;
  }

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
export function isHexAlphaCharCode(charCode: number | undefined): boolean {
  if (charCode === undefined) {
    return false;
  }

  const _A = 0x0041;
  const _F = 0x0046;
  if (_A <= charCode && charCode <= _F) {
    return true;
  }

  const _a = 0x0061;
  const _f = 0x0066;
  if (_a <= charCode && charCode <= _f) {
    return true;
  }
  return false;
}
export function isExponentialCharCode(charCode: number | undefined): boolean {
  const _E = 0x0045;
  const _e = 0x0065;

  return charCode === _E || charCode === _e;
}
export function isPlusOrMinusCode(charCode: number | undefined): boolean {
  const _plus = 0x002B;
  const _minus = 0x002D;

  return charCode === _plus || charCode === _minus;
}
export function isZeroDigitCharCode(charCode: number | undefined): boolean {
  if (charCode === undefined) {
    return false;
  }

  const _0 = 0x0030;
  return charCode === _0;
}
export function isDigitCharCode(charCode: number | undefined): boolean {
  if (charCode === undefined) {
    return false;
  }

  const _0 = 0x0030;
  const _9 = 0x0039;
  if (_0 <= charCode && charCode <= _9) {
    return true;
  }
  return false;
}
export function isNonZeroDigitCharCode(charCode: number | undefined): boolean {
  if (charCode === undefined) {
    return false;
  }

  const _1 = 0x0031;
  const _9 = 0x0039;
  if (_1 <= charCode && charCode <= _9) {
    return true;
  }
  return false;
}
export function isDotCharCode(charCode: number | undefined): boolean {
  const _dot = 0x002E;
  return charCode === _dot;
}
export function isFullwidthCharCode(charCode: number | undefined): boolean {
  if (charCode === undefined) {
    return false;
  }

  const fullWidthStart = 0x10000;
  if (fullWidthStart <= charCode) {
    return true;
  }
  return false;
}
export function isIdentifierHeadCharCode(charCode: number | undefined): charCode is number {
  if (charCode === undefined) {
    return false;
  }

  if (isAlphaCharCode(charCode)) {
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

  if (isFullwidthCharCode(charCode)) {
    return true;
  }
  return false;
}
export function isIdentifierTailCharCode(charCode: number | undefined): boolean {
  if (charCode === undefined) {
    return false;
  }

  if (isIdentifierHeadCharCode(charCode)) {
    return true;
  }
  if (isDigitCharCode(charCode)) {
    return true;
  }
  return false;
}
