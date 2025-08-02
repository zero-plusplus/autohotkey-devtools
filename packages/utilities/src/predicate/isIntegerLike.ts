/**
 * Checks whether the specified value can be converted to an integer.
 * @param {unknown} value
 * @return {boolean}
 */
export function isIntegerLike(value: unknown): boolean {
  switch (typeof value) {
    case 'number': return Number.isInteger(value);
    case 'bigint': return Number.isInteger(value);
    case 'string':
    {
      // Blank spaces are converted to 0, so exclude them
      if (value.trim() === '') {
        return false;
      }

      const converted = Number(value);
      return Number.isInteger(converted);
    }
    default: break;
  }

  return false;
}
