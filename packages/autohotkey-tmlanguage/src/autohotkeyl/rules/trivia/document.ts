import { Repository, RuleDescriptor, RuleName } from '../../../constants';
import { alt, capture, char, group, ignoreCase, inlineSpaces0, lookahead, lookbehind, negativeLookahead, ordalt, seq, startAnchor, text } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, includeScope, name, nameRule, patternsRule } from '../../../utils';

const startPattern = group(alt(startAnchor(), '\\G'));
export function createDocumentCommentRule(scopeName: ScopeName): BeginEndRule {
  return {
    name: name(scopeName, RuleName.DocumentComment),
    begin: capture(text('/**')),
    beginCaptures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
    },
    end: capture(text('*/')),
    endCaptures: {
      1: nameRule(scopeName, RuleDescriptor.End),
    },
    patterns: [
      {
        begin: lookbehind(text('/**')),
        while: seq(
          startPattern,
          inlineSpaces0(),
          capture(char('*')),
          negativeLookahead(char('/')),
        ),
        patterns: [
          // #region tag
          createTagAnnotationRule(scopeName, {
            startPattern: seq(
              startPattern,
              inlineSpaces0(),
              char('*'),
            ),
          }),
          // #endregion tag

          // #region markdown
          createCodefenceRule('autohotkeynext', [ 'ahknext' ]),
          createCodefenceRule('autohotkey2', [ 'ahk2' ]),
          createCodefenceRule('autohotkeyl', [ 'ahkl' ]),
          createCodefenceRule('autohotkey', [ 'ahk' ]),
          { include: 'text.html.markdown' },
          // #endregion markdown
        ],
      },
    ],
  };
}

// #region tag
interface Placeholder {
  startPattern: string;
}
function createTagAnnotationRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(createExampleAnnotationTagRule(scopeName, placeholder));
}
function createExampleAnnotationTagRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ignoreCase(text('@example'))),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
    },
    end: lookahead(seq(
      lookbehind(startPattern),
      inlineSpaces0(),
      group(alt(
        char('@'),
        text('*/'),
      )),
    )),
    patterns: [ includeRule(Repository.Self) ],
  };
}
// #endregion tag

// #region markdown
function createCodefenceRule(scopeName: ScopeName, aliases: string[]): BeginEndRule {
  return {
    begin: seq(
      lookbehind(startPattern),
      inlineSpaces0(),
      capture(seq(
        text('```'),
        group(ordalt(scopeName, ...aliases)),
      )),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
    },
    end: seq(
      lookbehind(startPattern),
      inlineSpaces0(),
      capture(text('```')),
    ),
    endCaptures: {
      1: nameRule(scopeName, RuleDescriptor.End),
    },
    patterns: [ includeScope(scopeName) ],
  };
}
// #endregion markdown
