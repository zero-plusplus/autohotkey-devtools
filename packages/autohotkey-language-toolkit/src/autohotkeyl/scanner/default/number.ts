import { scanNumberToken as scanNumber_ahk2 } from '../../../autohotkey2/scanner/default/number';
import type {
  ScanController,
  ScannerBehavior,
  Token,
} from '../../../core/scanner/types';
import { isIdentifierTailCharCode } from '../../utils';
import { scanIdentifierToken } from './identifier';

export const scanNumberToken: ScannerBehavior = (controller: ScanController): Token | undefined => {
  const { peekCodePoint } = controller;

  const numberToken = scanNumber_ahk2(controller);
  if (isIdentifierTailCharCode(peekCodePoint())) {
    return scanIdentifierToken(controller);
  }
  return numberToken;
};
