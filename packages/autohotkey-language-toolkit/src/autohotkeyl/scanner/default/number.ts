import { scanNumberToken as scanNumber_ahk2 } from '../../../autohotkey2/scanner/default/number';
import type {
  RawToken,
  RawTokenScanBehavior,
  RawTokenScanController,
} from '../../../core/scanner/types';
import { isIdentifierTailCharCode } from '../../utils';
import { scanIdentifierToken } from './identifier';

export const scanNumberToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { peekCodePoint } = controller;

  const numberToken = scanNumber_ahk2(controller);
  if (isIdentifierTailCharCode(peekCodePoint())) {
    return scanIdentifierToken(controller);
  }
  return numberToken;
};
