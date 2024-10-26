import { Repository } from '../../constants';
import type { Repositories, ScopeName } from '../../types';
import * as v1 from '../rules';

export function createRepositories(scopeName: ScopeName): Repositories {
  return {
    [Repository.Comment]: v1.createCommentRule(),
    [Repository.SingleLineComment]: v1.createSingleLineCommentRule(scopeName),
    [Repository.InLineComment]: v1.createInLineCommentRule(scopeName),
  };
}
