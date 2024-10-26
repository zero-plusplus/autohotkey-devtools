import * as v1 from '../autohotkeyl/rules';
import { Repository } from '../constants';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, patternsRule } from '../utils';
import * as expression from './repository/expression';
import * as statement from './repository/statement';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey2';

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
    ...expression.createLiteralRepositories(scopeName),
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
