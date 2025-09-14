import {
  alt,
  capture,
  char,
  inlineSpace,
  inlineSpaces0,
  lookahead,
  many0,
  negativeLookahead,
  negChar,
  negChars0,
  optcapture,
  reluctant,
  seq,
  startAnchor,
} from '../../../oniguruma';
import {
  includeRule,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type BeginEndRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  endPattern: string;
}
export function createContinuationSectionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      startAnchor(),
      inlineSpaces0(),
      capture(char('(')),
      inlineSpaces0(),
      capture(negChars0(')')),
      lookahead(placeholder.endPattern),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenParen),
      2: patternsRule(
        includeRule(Repository.ContinuationStringOptions),
        includeRule(Repository.InlineTrivias),
      ),
    },
    end: seq(
      startAnchor(),
      inlineSpaces0(),
      negativeLookahead(char('`')),
      capture(char(')')),
      capture(reluctant(many0(alt(
        seq(negativeLookahead(inlineSpace()), char(';')),
        negChar(';'),
      )))),
      inlineSpaces0(),
      optcapture(char(',')),
      inlineSpaces0(),
      lookahead(placeholder.endPattern),
    ),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
      2: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      ),
      3: patternsRule(includeRule(Repository.InlineTrivias)),
      4: patternsRule(includeRule(Repository.Comma)),
    },
    patterns: [ includeRule(Repository.ContinuationSectionText) ],
  };
}
