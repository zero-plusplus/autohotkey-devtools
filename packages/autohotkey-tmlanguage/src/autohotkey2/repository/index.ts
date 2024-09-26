import { Repositories, ScopeName } from '../../types';
import * as expression from './expression';
import * as literal from './literal';
import * as statement from './statement';

export * as expression from './expression';
export * as literal from './literal';
export * as statement from './statement';
export function createRepositories(scopeName: ScopeName): Repositories {
  // const utils = createUtilities(scopeName);

  return {
    ...expression.createLiteralRepositories(scopeName),
    ...literal.createLiteralRepositories(scopeName),
    ...statement.createLiteralRepositories(scopeName),
  };
}
