import { Repository } from '../../constants';
import type { Repositories, ScopeName } from '../../types';
import { includeRule, patternsRule } from '../../utils';
import * as v1 from '../rules';

export function createRepositories(scopeName: ScopeName): Repositories {
  return {
    [Repository.Comment]: patternsRule(
      includeRule(Repository.SingleLineComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.SingleLineComment]: v1.createSingleLineCommentRule(scopeName),
    [Repository.InLineComment]: v1.createInLineCommentRule(scopeName),
  };
}
