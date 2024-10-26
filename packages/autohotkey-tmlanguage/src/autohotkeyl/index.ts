import { Repository } from '../constants';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, patternsRule } from '../utils';
import * as command from './repository/command';
import * as expression from './repository/expression';
import * as legacy from './repository/legacy';
import * as statement from './repository/statement';
import * as v1 from './rules';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeyl';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Comment),
      includeRule(Repository.Statement),
    ],
    repository: createRepositories(scopeName),
  };
}

export function createRepositories(scopeName: ScopeName): Repositories {
  // const utils = createUtilities(scopeName);

  return {
    ...command.createRepositories(scopeName),
    ...expression.createLiteralRepositories(scopeName),
    ...legacy.createRepositories(scopeName),
    ...statement.createLiteralRepositories(scopeName),

    // #region comment
    [Repository.Comment]: patternsRule(
      includeRule(Repository.SingleLineComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.SingleLineComment]: v1.createSingleLineCommentRule(scopeName),
    [Repository.InLineComment]: v1.createInLineCommentRule(scopeName),
    // #endregion comment
  };
}
