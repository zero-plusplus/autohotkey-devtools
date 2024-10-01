import { Repositories, ScopeName } from '../../types';
import * as comment from './comment';
import * as expression from './expression';
import * as legacy from './legacy';
import * as statement from './statement';

export * as comment from './comment';
export * as expression from './statement';
export * as legacy from './legacy';
export * as statement from './statement';
export function createRepositories(scopeName: ScopeName): Repositories {
  // const utils = createUtilities(scopeName);

  return {
    ...comment.createRepositories(scopeName),
    ...expression.createLiteralRepositories(scopeName),
    ...legacy.createRepositories(scopeName),
    ...statement.createLiteralRepositories(scopeName),
  };
}
