import type { ScopeName } from '../../../../../src/tmlanguage';
import { $onOffToggle } from '../../../../helpers/definition/parameter/$onOffToggle';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Pause.htm
export function createPauseExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Pause';

  return [
    // Parameter 1: OnOffToggle
    ...$onOffToggle(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: OperateOnUnderlyingThread
    ...$shouldKeyword(scopeName, [ '0', '1' ], { name: commandName, index: 1, isLastParameter: true }),
  ];
}
