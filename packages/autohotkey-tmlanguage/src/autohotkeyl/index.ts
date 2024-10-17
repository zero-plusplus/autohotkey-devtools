import { Repository } from '../constants';
import type { ScopeName, TmLanguage } from '../types';
import { includeRule } from '../utils';
import { createRepositories } from './repository';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeyl';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Comment),
      includeRule(Repository.Statement),
    ],
    repository: {
      ...createRepositories(scopeName),
    },
  };
}
