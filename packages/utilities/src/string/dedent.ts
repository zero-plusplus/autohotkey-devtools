/**
 * Returns a template string with unnecessary indentation removed.
 * @param strings
 * @param values
 * @returns
 * @example
 * ```ts
 *  console.log(dedent`
 *    line 1
 *      line 2
 *    line 3
 *  `);
 *  // The output is as follows
 *  // |line1
 *  // |  line2
 *  // |line 3
 * ```
 */
export function dedent(strings: TemplateStringsArray, ...values: any[]): string {
  let trimTargetIndent: string | undefined;

  return strings.reduce<string>((prev, current, i) => {
    const string = ((): string => {
      if (i === 0) {
        return current.replace(/^(\r\n|\n)/, '');
      }
      if (i === (strings.length - 1)) {
        return current.trimEnd();
      }
      return current;
    })();

    if (trimTargetIndent === undefined) {
      trimTargetIndent = string.match(/^([^\S\r\n]*)/)?.[0] ?? '';
    }

    return prev
      + string.replaceAll(new RegExp(`^${trimTargetIndent}`, 'gm'), '')
      + String(values.at(i) ?? '');
  }, '');
}
