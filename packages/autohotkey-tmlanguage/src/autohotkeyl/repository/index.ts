import type { Repositories, ScopeName } from '../../types';
import * as command from './command';
import * as comment from './comment';
import * as expression from './expression';
import * as legacy from './legacy';
import * as statement from './statement';

export * as command from './command';
export * as comment from './comment';
export * as expression from './expression';
export * as legacy from './legacy';
export * as statement from './statement';
export function createRepositories(scopeName: ScopeName): Repositories {
  // const utils = createUtilities(scopeName);

  return {
    ...command.createRepositories(scopeName),
    ...comment.createRepositories(scopeName),
    ...expression.createLiteralRepositories(scopeName),
    ...legacy.createRepositories(scopeName),
    ...statement.createLiteralRepositories(scopeName),
  };
}
