import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { keywordOption } from '../option/keywordOption.ts';
import { $ } from './$.ts';

export function $soundComponent(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...keywordOption(scopeName, [ 'MASTER', 'SPEAKERS', 'DIGITAL', 'LINE', 'MICROPHONE', 'SYNTH', 'CD', 'TELEPHONE', 'PCSPEAKER', 'WAVE', 'AUX', 'ANALOG', 'HEADPHONES', 'N/A' ], placeholder),
  ];
}
