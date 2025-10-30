import {
  alt,
  anyChars0,
  capture,
  char,
  group,
  ignoreCase,
  inlineSpaces0,
  inlineSpaces1,
  lookbehind,
  optseq,
  seq,
  wordBound,
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
  callableNamePattern: string;
}
export function createNewCallExpressionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      lookbehind(wordBound()),
      inlineSpaces0(),
      capture(ignoreCase('new')),
      optseq(
        inlineSpaces1(),
        optseq(
          capture(anyChars0()),
          capture(char('.')),
        ),
        group(alt(
          lookbehind(char(']', '.')),
          capture(placeholder.callableNamePattern),
        )),
      ),
      capture(char('(')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.KeywordInExpression),
      2: patternsRule(includeRule(Repository.Expression)),
      3: nameRule(scopeName, RuleName.Dot),
      4: nameRule(scopeName, RuleName.ClassName),
      5: nameRule(scopeName, RuleName.OpenParen),
    },
    end: capture(char(')')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
    },
    patterns: [
      includeRule(Repository.Meta),

      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}
