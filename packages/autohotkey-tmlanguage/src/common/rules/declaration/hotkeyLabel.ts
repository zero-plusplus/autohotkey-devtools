import { RuleName, StyleName } from '../../../constants';
import {
  capture, char, groupMany0, groupMany1, inlineSpace, inlineSpaces0, keyword, lookbehind, negChars1,
  seq, text, textalt,
} from '../../../oniguruma';
import { name, nameRule, patternsRule } from '../../../tmlanguage';
import type { MatchRule, ScopeName } from '../../../types';
import * as constants_common from '../../constants';

interface Placeholder {
  startAnchor: string;
}
export function createHotkeyLabelRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      capture(negChars1('"', `'`)),
      capture(text('::')),
    ),
    captures: {
      1: patternsRule(
        {
          name: name(scopeName, RuleName.HotkeyFlag),
          match: seq(
            lookbehind(placeholder.startAnchor),
            inlineSpaces0(),
            groupMany1(textalt(...constants_common.hotkeyFlags)),
          ),
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
      ),
      2: nameRule(scopeName, RuleName.ColonColon),
    },
  };
}
