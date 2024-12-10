// #region char classes
export function startAnchor(): string {
  return '^';
}
export function endAnchor(): string {
  return '$';
}
export function backslash(): string {
  return '\\\\';
}
export function number(): string {
  return '\\d';
}
export function numbers0(): string {
  return many0(number());
}
export function numbers1(): string {
  return many1(number());
}
export function wordChar(): string {
  return '\\w';
}
export function wordChars0(): string {
  return many0(wordChar());
}
export function wordChars1(): string {
  return many1(wordChar());
}
export function wordBound(): string {
  return '\\b';
}
export function keyword(...words: string[]): string {
  if (1 < words.length) {
    return seq(lookbehind(wordBound()), ignoreCase(ordalt(...words)), lookahead(wordBound()));
  }
  return seq(lookbehind(wordBound()), ignoreCase(words[0]), lookahead(wordBound()));
}
export function anyChar(): string {
  return '.';
}
export function anyChars0(): string {
  return many0(anyChar());
}
export function anyChars1(): string {
  return many1(anyChar());
}
export function inlineSpace(): string {
  return '\\s';
}
export function inlineSpaces0(): string {
  return many0(inlineSpace());
}
export function inlineSpaces1(): string {
  return many1(inlineSpace());
}
export function whitespace(): string {
  return '\\s';
}
export function whitespaces0(): string {
  return many0(whitespace());
}
export function whitespaces1(): string {
  return many1(whitespace());
}
export function asciiChar(): string {
  return '[:ascii:]';
}
// #endregion char classes

// #region combinator
export function many0(onigurumaText: string): string {
  return `${onigurumaText}*`;
}
export function many1(onigurumaText: string): string {
  return `${onigurumaText}+`;
}
export function groupMany0(onigurumaText: string): string {
  return `${group(onigurumaText)}*`;
}
export function groupMany1(onigurumaText: string): string {
  return `${group(onigurumaText)}+`;
}
export function manyRange(onigurumaText: string, start?: number, end?: number): string {
  if (typeof start === 'number' && typeof end === 'number') {
    return `${onigurumaText}{${start},${end}}`;
  }
  if (typeof start === 'number') {
    return `${onigurumaText}{${start}}`;
  }
  if (typeof end === 'number') {
    return `${onigurumaText}{,${end}}`;
  }
  throw Error('The argument is not specified correctly.');
}
export function manyLimit(onigurumaText: string, limit: number): string {
  return manyRange(onigurumaText, undefined, limit);
}
export function reluctant(onigurumaText: string): string {
  if ((/(?<!\\)[?+*}]/).test(onigurumaText)) {
    return `${onigurumaText}?`;
  }
  throw Error('The specified text is not a quantity specifier(e.g. `.*`, `.+`, `.{1,2}`).');
}
export function optional(onigurumaText: string): string {
  if (onigurumaText.startsWith('(') && onigurumaText.startsWith(')')) {
    return `${onigurumaText}?`;
  }
  return `${group(onigurumaText)}?`;
}
export function opt(...args: Parameters<typeof optional>): ReturnType<typeof optional> {
  return optional(...args);
}
export function sequence(...onigurumaTexts: string[]): string {
  return onigurumaTexts.join('');
}
export function seq(...args: Parameters<typeof sequence>): ReturnType<typeof sequence> {
  return sequence(...args);
}
export function optseq(...onigurumaTexts: string[]): string {
  return optional(seq(...onigurumaTexts));
}
export function alternative(...onigurumaTexts: string[]): string {
  return onigurumaTexts.join('|');
}
export function alt(...args: Parameters<typeof alternative>): ReturnType<typeof alternative> {
  return alternative(...args);
}
export function orderedAlternative(...onigurumaTexts: string[]): string {
  return alternative(...onigurumaTexts.sort((a, b) => b.length - a.length));
}
export function ordalt(...args: Parameters<typeof orderedAlternative>): ReturnType<typeof orderedAlternative> {
  return orderedAlternative(...args);
}
export function ignoreCase(onigurumaText?: string): string {
  return typeof onigurumaText === 'string'
    ? `(?i:${onigurumaText})`
    : `(?i)`;
}
export function char(...characters: string[]): string {
  return `[${[ ...characters ].map((character) => escapeCharClass(character)).join('')}]`;
}
export function chars0(...characters: string[]): string {
  return many0(char(...characters));
}
export function chars1(...characters: string[]): string {
  return many1(char(...characters));
}
export function text(rawText: string): string {
  return escapeOnigurumaText(rawText);
}
export function negChar(...characters: string[]): string {
  return `[^${[ ...characters ].map((character) => escapeCharClass(character)).join('')}]`;
}
export function negChars0(...characters: string[]): string {
  return many0(negChar(...characters));
}
export function negChars1(...characters: string[]): string {
  return many1(negChar(...characters));
}
export function charRange(startCharacter: string, endCharacter: string): string {
  return `[${startCharacter}-${endCharacter}]`;
}
export function capture(onigurumaText: string): string {
  return `(${onigurumaText})`;
}
export function group(onigurumaText: string): string {
  return `(?:${onigurumaText})`;
}
export function lookahead(onigurumaText: string): string {
  return `(?=${onigurumaText})`;
}
export function negativeLookahead(onigurumaTexts: string): string {
  return `(?!${onigurumaTexts})`;
}
export function lookbehind(onigurumaText: string): string {
  return `(?<=${onigurumaText})`;
}
export function negativeLookbehind(onigurumaText: string): string {
  return `(?<!${onigurumaText})`;
}
// #endregion combinator

// #region helpers
export function escapeCharClass(text: string): string {
  return text.replaceAll(/(?<!:)([\-\[\]\^\$])/gu, '\\$1');
}
export function escapeOnigurumaText(text: string): string {
  return text.replaceAll(/([.*?+{}|()[\]^\\/])/gu, '\\$1');
}
export function escapeOnigurumaTexts(onigurumaTexts: readonly string[]): string[] {
  return onigurumaTexts.map((onigurumaText) => escapeOnigurumaText(onigurumaText));
}
// #endregion helpers
