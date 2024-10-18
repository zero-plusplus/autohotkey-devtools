// #region char classes
export function startAnchor(): string {
  return '^';
}
export function endAnchor(): string {
  return '$';
}
export function wordBound(): string {
  return '\\b';
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
  return char(' ', '\\t');
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
export function reluctant(onigurumaText: string): string {
  if ((/(?<!\\)[?+*}]/).test(onigurumaText)) {
    return `${onigurumaText}?`;
  }
  throw Error('The specified text is not a quantity specifier(e.g. `.*`, `.+`, `.{1,2}`).');
}
export function optional(onigurumaText: string): string {
  return `${noCapture(onigurumaText)}?`;
}
export const opt: typeof optional = (onigurumaText: string) => optional(onigurumaText);
export function sequence(...onigurumaTexts: string[]): string {
  return onigurumaTexts.join('');
}
export const seq: typeof sequence = (...onigurumaTexts: string[]) => sequence(...onigurumaTexts);
export function optseq(...onigurumaTexts: string[]): string {
  return optional(seq(...onigurumaTexts));
}
export function alternative(...onigurumaTexts: string[]): string {
  return onigurumaTexts.join('|');
}
export const alt: typeof alternative = (...onigurumaTexts: string[]) => alternative(...onigurumaTexts);
export function orderedAlternative(...onigurumaTexts: string[]): string {
  return alternative(...onigurumaTexts.sort((a, b) => b.length - a.length));
}
export const ordalt: typeof orderedAlternative = (...onigurumaTexts: string[]) => orderedAlternative(...onigurumaTexts);
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
export function negChar(...characters: string[]): string {
  return `[^${[ ...characters ].map((character) => escapeCharClass(character)).join('')}]`;
}
export function negChars0(...characters: string[]): string {
  return many0(negChar(...characters));
}
export function negChars1(...characters: string[]): string {
  return many1(negChar(...characters));
}
export function capture(onigurumaText: string): string {
  return `(${onigurumaText})`;
}
export function noCapture(onigurumaText: string): string {
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
  return text.replaceAll(/(?<!:)([\[\]])/gu, '\\$1');
}
export function escapeOnigurumaText(text: string): string {
  return text.replaceAll(/([.*?+{}|()[\]^/])/gu, '\\$1');
}
export function escapeOnigurumaTexts(onigurumaTexts: string[]): string[] {
  return onigurumaTexts.map((onigurumaText) => escapeOnigurumaText(onigurumaText));
}
// #endregion helpers
