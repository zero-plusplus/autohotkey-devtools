import { hasFlag } from '@zero-plusplus/utilities/src';
import { directiveDefinitions } from '../../../../src/autohotkeyl/definition';
import { CommandFlag, Repository, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...directiveDefinitions.map((definition): ExpectedTestData => {
      const scopes = hasFlag(definition.flags, CommandFlag.Deprecated)
        ? name(scopeName, Repository.DirectiveStatement, RuleName.DirectiveName, StyleName.Strikethrough)
        : name(scopeName, Repository.DirectiveStatement, RuleName.DirectiveName);

      return [ definition.name, [ { text: definition.name, scopes: scopes } ] ];
    }),
  ];
}
