/**
 * Repeats the specified function a specified number of times.
 * @param count
 * @param callback
 * @returns An array consisting of the result of the `callback`
 */
export function times<R>(count: number, callback: (index: number) => R): R[] {
  const results: R[] = [];
  for (let i = 0; i < count; i++) {
    results.push(callback(i));
  }
  return results;
}
