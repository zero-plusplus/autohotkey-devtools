import * as rules_common from '../../../common/rules';
import type { CommandDefinition } from '../../../definition';
import { includeRule, patternsRule, Repository, RuleName, type Repositories, type ScopeName } from '../../../tmlanguage';

interface Placeholder_DirectiveRepositories {
  startPattern: string;
  endPattern: string;
  unquotedArgumentPattern: string;
}
export function createDirectiveRepositories(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_DirectiveRepositories): Repositories {
  return {
    [Repository.DirectiveStatement]: rules_common.createDirectiveStatementRule(definitions, {
      startPattern: placeholder.startPattern,
      endPattern: placeholder.endPattern,
    }),
    [Repository.DirectiveDefinitions]: patternsRule(
      includeRule(Repository.Trivias),
      ...rules_common.definitionsToRules(scopeName, definitions, {
        ...placeholder,
        commandElementName: RuleName.DirectiveName,
        legacyMode: true,
      }),
    ),
  };
}
