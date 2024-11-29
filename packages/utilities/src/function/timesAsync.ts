/**
 * Repeats the specified async function a specified number of times.
 * @param count
 * @param callback
 * @returns An array consisting of the result of the `callback`
 */
export async function timesAsync<R>(count: number, callback: (index: number) => Promise<R>): Promise<R[]> {
  const range = Array.from({ length: count }, (value, i) => i);

  const results: R[] = [];
  for await (const i of range) {
    results.push(await callback(i));
  }
  return results;
}
