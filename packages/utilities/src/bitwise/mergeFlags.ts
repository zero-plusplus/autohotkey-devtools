import { onFlag } from './onFlag';

/**
 * Merges the specified flags and returns them.
 * @param flags
 * @returns
 */
export function mergeFlags(...flags: number[]): number {
  return flags.reduce<number>((prev, current) => {
    return onFlag(prev, current);
  }, 0);
}
