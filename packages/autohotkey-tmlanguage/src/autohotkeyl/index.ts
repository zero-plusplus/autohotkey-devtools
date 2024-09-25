import { Repository, ScopeName, TmLanguage } from '../types';
import { includeRule } from '../utils';
import { createRepositories } from './repository';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeyl';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [ includeRule(Repository.Literal) ],
    repository: {
      ...createRepositories(scopeName),
    },
  };
}
