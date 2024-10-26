import * as v2 from '../autohotkey2';
import { Repository } from '../constants';
import type { ScopeName, TmLanguage } from '../types';
import { includeRule } from '../utils';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeynext';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Comment),
      includeRule(Repository.Statement),
    ],
    repository: v2.createRepositories(scopeName),
  };
}
