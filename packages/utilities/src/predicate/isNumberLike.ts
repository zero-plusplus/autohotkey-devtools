/**
 * Checks whether the specified value can be converted to a number.
 * @param {unknown} value
 * @return {boolean}
 */
export function isNumberLike(value: unknown): boolean {
  switch (typeof value) {
    case 'number': return isFinite(value);
    case 'bigint': return isFinite(Number(value));
    case 'string':
    {
      // Blank spaces are converted to 0, so exclude them
      if (value.trim() === '') {
        return false;
      }

      const converted = Number(value);
      return !isNaN(converted) && isFinite(converted);
    }
    default: break;
  }

  return false;
}
