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
      let result = current;
      if (i === 0) {
        result = result.replace(/^(\r\n|\n)/, '');
      }
      if (i === (strings.length - 1)) {
        result = result.replace(/(\s*)$/gm, '');
      }
      return result;
    })();

    if (trimTargetIndent === undefined) {
      trimTargetIndent = string.match(/^([^\S\r\n]*)/)?.[0] ?? '';
    }

    return prev
      + string.replaceAll(new RegExp(`^${trimTargetIndent}`, 'gm'), '')
      + String(values.at(i) ?? '');
  }, '');
}
