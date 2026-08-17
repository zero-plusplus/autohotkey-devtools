import { isDigitCharCode } from '../../core';
import { isIdentifierHeadCharCode as isIdentifierHeadCharCode_v2 } from '../autohotkey2/utils';

export function isIdentifierHeadCharCode(charCode: number | undefined): charCode is number {
  if (charCode === undefined) {
    return false;
  }

  if (isIdentifierHeadCharCode_v2(charCode)) {
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

