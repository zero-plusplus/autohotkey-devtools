import { Repository, ScopeName, TmLanguage } from '../types';
import { createUtilities } from '../utils';
import { createLiteralRepositories } from './repository/literal';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeyl';
  const utils = createUtilities(scopeName);
  return {
    scopeName: `source.${scopeName}`,
    patterns: [ utils.include(Repository.String) ],
    repository: {
      ...createLiteralRepositories(utils),
    },
  };
}
