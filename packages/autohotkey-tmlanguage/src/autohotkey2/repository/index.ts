import { Repositories, Utilities } from '../../types';
import * as literal from './literal';

export function createRepositories(utils: Utilities): Repositories {
  return {
    ...literal.createLiteralRepositories(utils),
  };
}
