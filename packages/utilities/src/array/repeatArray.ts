/**
 * Creates an array of the specified values concatenated the specified number of times.
 * @param target
 * @param count
 * @returns
 */
export function repeatArray<T>(count: number, target: T[]): T[] {
  const repeated: T[] = [];
  for (let i = 0; i < count; i++) {
    repeated.push(...target);
  }
  return repeated;
}
