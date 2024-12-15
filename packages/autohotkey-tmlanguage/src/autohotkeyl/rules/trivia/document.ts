import { Repository, RuleDescriptor, RuleName } from '../../../constants';
import { alt, anyChars0, anyChars1, capture, char, endAnchor, group, ignoreCase, inlineSpaces0, keyword, lookahead, lookbehind, negativeLookahead, negChars1, ordalt, seq, startAnchor, text } from '../../../oniguruma';
import type { BeginEndRule, MatchRule, PatternsRule, Rule, ScopeName } from '../../../types';
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
  return patternsRule(
    createExampleAnnotationTagRule(scopeName, placeholder),

    createFlagAnnotationTagRule(scopeName, {
      startPattern: placeholder.startPattern,
      tagNames: [
        // https://jsdoc.app/tags-abstract
        '@abstract',
        '@virtual',

        // https://jsdoc.app/tags-async
        '@async',
      ],
    }),
    createAttributeAnnotationTagRule(scopeName, {
      startPattern: placeholder.startPattern,
      tagNames: [
        // https://jsdoc.app/tags-access
        '@access',
      ],
      rules: [
        {
          name: name(scopeName, RuleName.KeywordInDocument),
          match: ignoreCase(ordalt('package', 'private', 'protected', 'public', 'module')),
        },
      ],
    }),
    createAttributeAnnotationTagRule(scopeName, {
      startPattern: placeholder.startPattern,
      tagNames: [
        // https://jsdoc.app/tags-alias
        '@alias',

        // https://jsdoc.app/tags-augments
        '@augments',
        '@extends',

        // https://jsdoc.app/tags-name
        '@name',
      ],
      rules: [
        {
          name: name(scopeName, RuleName.NamePathInDocument),
          match: negChars1('\\s'),
        },
      ],
    }),
    createAttributeAnnotationTagRule(scopeName, {
      startPattern: placeholder.startPattern,
      tagNames: [
        // https://jsdoc.app/tags-author
        '@author',
      ],
      rules: [
        {
          name: name(scopeName, RuleName.NamePathInDocument),
          match: anyChars1(),
        },
      ],
    }),
    createAttributeAnnotationTagRule(scopeName, {
      startPattern: placeholder.startPattern,
      tagNames: [
        // https://jsdoc.app/tags-borrows
        '@borrows',
      ],
      rules: [
        {
          name: name(scopeName, RuleName.ReservedWordInDocument),
          match: keyword('as'),
        },
        {
          name: name(scopeName, RuleName.NamePathInDocument),
          match: negChars1('\\s'),
        },
      ],
    }),
  );
}

interface Placeholder2 {
  startPattern: string;
  tagNames: readonly string[];
}
function createFlagAnnotationTagRule(scopeName: ScopeName, placeholder: Placeholder2): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ordalt(...placeholder.tagNames)),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
    },
  };
}

interface Placeholder3 {
  tagNames: readonly string[];
  startPattern: string;
  rules: Rule[];
}
function createAttributeAnnotationTagRule(scopeName: ScopeName, placeholder: Placeholder3): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ordalt(...placeholder.tagNames)),
      inlineSpaces0(),
      capture(anyChars0()),
      endAnchor(),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
      2: patternsRule(...placeholder.rules),
    },
  };
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
