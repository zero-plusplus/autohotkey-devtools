import { Repository, ScopeName, TmLanguage } from '../types';
import { createUtilities } from '../utils';
import * as repositories_ahk2 from '../autohotkey2/repository';
import * as repositories_ahk2_1 from './repository/v2_1';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeynext';
  const utils = createUtilities(scopeName);
  return {
    scopeName: `source.${scopeName}`,
    patterns: [ utils.include(Repository.String) ],
    repository: {
      ...repositories_ahk2.createRepositories(utils),
      ...repositories_ahk2_1.createRepositories(utils),
    },
  };
}
