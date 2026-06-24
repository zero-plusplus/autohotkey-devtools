import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { decimalOption } from './decimalOption.ts';
import { floatOption } from './floatOption.ts';
import { hexOption } from './hexOption.ts';

export function numberOption(scopeName: ScopeName, options: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...decimalOption(scopeName, options, placeholder),
    ...floatOption(scopeName, options, placeholder),
    ...hexOption(scopeName, options, placeholder),
  ];
}
