import { Repository, ScopeName, TmLanguage } from '../types';
import { includeRule } from '../utils';
import * as repositories_ahk2 from '../autohotkey2/repository';
import * as repositories_ahk2_1 from './repository/v2_1';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeynext';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [ includeRule(Repository.Literal) ],
    repository: {
      ...repositories_ahk2.createRepositories(scopeName),
      ...repositories_ahk2_1.createRepositories(scopeName),
    },
  };
}
