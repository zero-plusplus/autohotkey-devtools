import {
  capture,
  char,
  groupMany0,
  groupMany1,
  inlineSpace,
  keyword,
  lookbehind,
  negChars1,
  seq,
  text,
  textalt,
} from '../../../oniguruma';
import {
  includeRule,
  name,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  StyleName,
  type MatchRule,
  type PatternsRule,
  type ScopeName,
} from '../../../tmlanguage';
import * as constants_common from '../../constants';

interface Placeholder {
  startPattern: string;
}
export function createHotkeyLabelRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      capture(negChars1('"', `'`)),
      capture(text('::')),
    ),
    captures: {
      1: patternsRule(includeRule(Repository.HotkeyName)),
      2: nameRule(scopeName, RuleName.ColonColon),
    },
  };
}
export function createHotkeyNameRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    {
      name: name(scopeName, RuleName.HotkeyFlag),
      match: groupMany1(textalt(...constants_common.hotkeyFlags)),
    },
    {
      match: seq(
        capture(groupMany0(textalt(...constants_common.modifierSymbols))),
        capture(negChars1(inlineSpace(), '&')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.HotkeyModifier),
        2: nameRule(scopeName, RuleName.HotkeyLabelName),
      },
    },
    {
      name: name(scopeName, RuleName.HotkeyLabelName),
      match: keyword(...constants_common.keyNameList),
    },
    {
      name: name(scopeName, RuleName.HotkeyCombinator),
      match: char('&'),
    },
    {
      name: name(scopeName, RuleName.HotkeyLabelName, StyleName.Invalid),
      match: negChars1(inlineSpace()),
    },
  );
}
