import { Repositories, ScopeName } from '../../types';
import * as expression from './expression';
import * as statement from './statement';

export * as expression from './statement';
export * as statement from './statement';
export function createRepositories(scopeName: ScopeName): Repositories {
  // const utils = createUtilities(scopeName);

  return {
    ...expression.createLiteralRepositories(scopeName),
    ...statement.createLiteralRepositories(scopeName),
  };
}
