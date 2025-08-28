import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { keywordOption } from '../option/keywordOption';
import { $ } from './$';

export function $soundControlType(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...keywordOption(scopeName, [ 'VOLUME', 'VOL', 'ONOFF', 'MUTE', 'MONO', 'LOUDNESS', 'STEREOENH', 'BASSBOOST', 'PAN', 'QSOUNDPAN', 'BASS', 'TREBLE', 'EQUALIZER' ], placeholder),
  ];
}
