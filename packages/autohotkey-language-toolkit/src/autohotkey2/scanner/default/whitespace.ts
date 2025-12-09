import {
  scanCRLFToken as scanCRLFToken_ahkl,
  scanLFToken as scanLFToken_ahkl,
  scanSpaceToken as scanSpaceToken_ahkl,
  scanTabToken as scanTabToken_ahkl,
} from '../../../autohotkeyl/scanner/default/whitespace';
import type {
  RawToken,
  RawTokenScanBehavior,
  RawTokenScanController,
} from '../../../core/scanner/types';

export const scanLFToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  return scanLFToken_ahkl(controller);
};
export const scanCRLFToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  return scanCRLFToken_ahkl(controller);
};
export const scanSpaceToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  return scanSpaceToken_ahkl(controller);
};
export const scanTabToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  return scanTabToken_ahkl(controller);
};
