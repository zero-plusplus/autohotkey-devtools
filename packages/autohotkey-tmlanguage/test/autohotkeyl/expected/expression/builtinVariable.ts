import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createBuiltinVariableExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...constants_v1.builtinVaribles.map((builtinVariable): ExpectedTestData => {
      return [ builtinVariable, [ { text: builtinVariable, scopes: name(scopeName, RuleName.BuiltInVariable) } ] ];
    }),
  ];
}
