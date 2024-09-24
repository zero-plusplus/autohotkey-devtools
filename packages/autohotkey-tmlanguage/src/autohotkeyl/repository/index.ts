import { Repositories, ScopeName } from '../../types';
import * as literal from './literal';

export * as literal from './literal';
export function createRepositories(scopeName: ScopeName): Repositories {
  // const utils = createUtilities(scopeName);

  return {
    ...literal.createLiteralRepositories(scopeName),
  };
}
