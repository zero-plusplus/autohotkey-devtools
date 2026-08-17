import {
  isAlphaCharCode,
  isDigitCharCode,
  isFullwidthCharCode, 
} from '../../core';

export function isIdentifierHeadCharCode(charCode: number | undefined): charCode is number {
  if (charCode === undefined) {
    return false;
  }

  if (isAlphaCharCode(charCode)) {
    return true;
  }
  if (isDigitCharCode(charCode)) {
    return true;
  }

  const _underscore = 0x005F;
  if (charCode === _underscore) {
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

