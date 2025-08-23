import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { decimalOption } from './decimalOption';
import { floatOption } from './floatOption';
import { hexOption } from './hexOption';

export function numberOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...decimalOption(scopeName, options, placeholder),
    ...floatOption(scopeName, options, placeholder),
    ...hexOption(scopeName, options, placeholder),
  ];
}
