import { Repositories, ScopeName } from '../../types';
import * as literal from './literal';
import * as statement from './statement';

export * as literal from './literal';
export * as statement from './statement';
export function createRepositories(scopeName: ScopeName): Repositories {
  // const utils = createUtilities(scopeName);

  return {
    ...literal.createLiteralRepositories(scopeName),
    ...statement.createLiteralRepositories(scopeName),
  };
}
