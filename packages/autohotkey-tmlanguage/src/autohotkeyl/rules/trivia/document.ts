import { Repository, RuleDescriptor, RuleName, StyleName, TokenType } from '../../../constants';
import { alt, anyChars0, anyChars1, capture, char, endAnchor, group, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, many0, negativeLookahead, negChar, negChars1, optional, optseq, ordalt, seq, startAnchor, text } from '../../../oniguruma';
import type { BeginEndRule, ElementName, MatchRule, PatternsRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  identifierPattern: string;
}
export function createDocumentCommentRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  const contentStartPattern = seq(startAnchor(), inlineSpaces0(), char('*'));

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
          group(alt(startAnchor(), '\\G')),
          inlineSpaces0(),
          capture(char('*')),
          negativeLookahead(char('/')),
        ),
        patterns: [
          createTagAnnotationRule(scopeName, {
            startPattern: contentStartPattern,
            identifierPattern: placeholder.identifierPattern,
          }),
          // #endregion tag

          // #region markdown
          includeRule(Repository.FencedCodeBlockInDocument),
          includeRule(Repository.InlineTextInDocument),
          { include: 'text.html.markdown#block' },
          // #endregion markdown
        ],
      },
    ],
  };
}
export function createInlineTextInDocumentRule(scopeName: ScopeName): PatternsRule {
  return {
    patterns: [
      createInlineLinkTagRule(scopeName),
      {
        begin: char('-'),
        end: endAnchor(),
        patterns: [ { include: 'text.html.markdown#inline' } ],
      },
      { include: 'text.html.markdown#inline' },
    ],
  };
}

// #region tag
interface Placeholder_TagAnnotation {
  startPattern: string;
  identifierPattern: string;
}
function createTagAnnotationRule(scopeName: ScopeName, placeholder: Placeholder_TagAnnotation): PatternsRule {
  return patternsRule(
    createFlagAnnotationOrDescriptorTagRule(scopeName, {
      ...placeholder,
      tagNames: [
        // https://jsdoc.app/tags-abstract
        '@abstract',
        '@virtual',

        // https://jsdoc.app/tags-async
        '@async',

        // https://jsdoc.app/tags-classdesc
        '@classdesc',

        // https://jsdoc.app/tags-copyright
        '@copyright',

        // https://jsdoc.app/tags-deprecated
        '@deprecated',

        // https://jsdoc.app/tags-description
        '@description',
        '@desc',

        // https://jsdoc.app/tags-file
        '@file',
        '@fileoverview',
        '@overview',

        // https://jsdoc.app/tags-global
        '@global',

        // https://jsdoc.app/tags-ignore
        '@ignore',

        // https://jsdoc.app/tags-override
        '@override',

        // https://jsdoc.app/tags-private
        '@private',

        // https://jsdoc.app/tags-protected
        '@protected',

        // https://jsdoc.app/tags-public
        '@public',

        // https://jsdoc.app/tags-readonly
        '@readonly',

        // https://jsdoc.app/tags-static
        '@static',

        // https://jsdoc.app/tags-summary
        '@summary',

        // https://jsdoc.app/tags-todo
        '@todo',

        // https://jsdoc.app/tags-version
        '@version',
      ],
    }),
    createAttributeAnnotationTagRule(scopeName, {
      ...placeholder,
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
      ...placeholder,
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
      ...placeholder,
      tagNames: [
        // https://jsdoc.app/tags-author
        '@author',

        // https://jsdoc.app/tags-since
        '@since',
      ],
      rules: [
        {
          name: name(scopeName, RuleName.NamePathInDocument),
          match: anyChars1(),
        },
      ],
    }),
    createAttributeAnnotationTagRule(scopeName, {
      ...placeholder,
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
    createAttributeAnnotationTagRule(scopeName, {
      ...placeholder,
      contentName: name(scopeName, RuleName.EmbeddedLanguage),
      tagNames: [
        // https://jsdoc.app/tags-default
        '@default',
        '@defaultvalue',
      ],
      rules: [ includeRule(Repository.Expressions) ],
    }),
    createAttributeAnnotationTagRule(scopeName, {
      ...placeholder,
      tagNames: [
        // https://jsdoc.app/tags-see
        '@see',
      ],
      rules: [
        {
          name: name(scopeName, RuleName.NameOrUrlInDocument),
          match: seq(
            negChar('[', '{', '\\s'),
            anyChars0(),
          ),
        },
      ],
    }),
    createDeclarationTagRule(scopeName, {
      ...placeholder,
      tagNames: [
        // https://jsdoc.app/tags-class
        '@class',
        '@constructor',

        // https://jsdoc.app/tags-constant
        '@constant',
        '@const',

        // https://jsdoc.app/tags-constructs
        '@constructs',

        // https://jsdoc.app/tags-enum
        '@enum',

        // https://jsdoc.app/tags-function
        '@function',
        '@func',
        '@method',

        // https://jsdoc.app/tags-implements
        '@implements',

        // https://jsdoc.app/tags-param
        '@param',
        '@arg',
        '@argument',

        // https://jsdoc.app/tags-property
        '@property',
        '@prop',

        // https://jsdoc.app/tags-typedef
        '@typedef',
      ],
      rules: [],
    }),
    createTypeDeclarationTagRule(scopeName, {
      ...placeholder,
      tagNames: [
        // https://jsdoc.app/tags-returns
        '@returns',
        '@return',

        // https://jsdoc.app/tags-throws
        '@throws',
        '@exception',

        // https://jsdoc.app/tags-type
        '@type',
      ],
      rules: [],
    }),

    // https://jsdoc.app/tags-example
    createExampleTagRule(scopeName, placeholder),
  );
}

interface Placeholder_FlagAnnotationTag {
  startPattern: string;
  tagNames: readonly string[];
}
// e.g. `@xxx`
function createFlagAnnotationOrDescriptorTagRule(scopeName: ScopeName, placeholder: Placeholder_FlagAnnotationTag): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ordalt(...placeholder.tagNames)),
      lookahead(alt(inlineSpace(), endAnchor())),
      inlineSpaces0(),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
    },
    end: endAnchor(),
    patterns: [ includeRule(Repository.InlineTextInDocument) ],
  };
}

interface Placeholder_AttributeAnnotationTag {
  startPattern: string;
  contentName?: ElementName;
  tagNames: readonly string[];
  rules: Rule[];
}
// e.g. `@xxx yyyy`
function createAttributeAnnotationTagRule(scopeName: ScopeName, placeholder: Placeholder_AttributeAnnotationTag): BeginEndRule {
  return {
    ...(placeholder.contentName ? { contentName: placeholder.contentName } : {}),
    begin: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ordalt(...placeholder.tagNames)),
      group(alt(inlineSpace(), endAnchor())),
      inlineSpaces0(),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
    },
    end: endAnchor(),
    patterns: [
      ...placeholder.rules,
      includeRule(Repository.InlineTextInDocument),
    ],
  };
}

interface Placeholder_BlockTag {
  startPattern: string;
  identifierPattern: string;
  tagNames: readonly string[];
  rules: Rule[];
}
function createBlockTagRule(scopeName: ScopeName, placeholder: Placeholder_BlockTag): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ignoreCase(ordalt(...placeholder.tagNames))),
      lookahead(alt(inlineSpace(), endAnchor())),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
    },
    end: lookahead(seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      group(alt(
        char('@'),
        text('*/'),
      )),
    )),
    patterns: [
      ...placeholder.rules,
      includeRule(Repository.InlineTextInDocument),
    ],
  };
}
function createDeclarationTagRule(scopeName: ScopeName, placeholder: Placeholder_BlockTag): BeginEndRule {
  const assignmentRulePatterns: Rule[] = [
    {
      name: name(scopeName, RuleName.ReservedWordInDocument, StyleName.Strong),
      match: seq(
        lookbehind(seq(
          char('['),
          inlineSpaces0(),
        )),
        char('*'),
        lookahead(seq(
          inlineSpaces0(),
          char(']'),
        )),
      ),
    },
    includeRule(Repository.Comma),
    includeRule(Repository.Expression),
  ];

  return createBlockTagRule(scopeName, {
    ...placeholder,
    tagNames: placeholder.tagNames,
    rules: [
      // e.g. `@xxx name`
      {
        match: seq(
          lookbehind(seq(
            char('*'),
            inlineSpaces0(),
            ignoreCase(ordalt(...placeholder.tagNames)),
            inlineSpaces0(),
          )),
          capture(placeholder.identifierPattern),
          lookahead(alt(inlineSpace(), endAnchor())),
          inlineSpaces0(),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.Variable),
        },
      },
      // e.g. `@xxx {type}`, `@xxx {type} name`
      {
        contentName: name(scopeName, TokenType.Other, RuleName.TypeInDocument),
        begin: seq(
          lookbehind(seq(
            placeholder.startPattern,
            inlineSpaces0(),
            ignoreCase(ordalt(...placeholder.tagNames)),
            inlineSpaces0(),
          )),
          capture(char('{')),
        ),
        beginCaptures: {
          1: nameRule(scopeName, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace),
        },
        end: seq(
          capture(char('}')),
          inlineSpaces0(),
          optional(capture(placeholder.identifierPattern)),
          lookahead(alt(inlineSpace(), endAnchor())),
          inlineSpaces0(),
        ),
        endCaptures: {
          1: nameRule(scopeName, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace),
          2: nameRule(scopeName, RuleName.Variable),
        },
      },
      // e.g. `@xxx {type} [name := "abc"]`, `@xxx [name := "abc"]`
      {
        name: name(scopeName, TokenType.Other),
        begin: seq(
          lookbehind(seq(
            placeholder.startPattern,
            inlineSpaces0(),
            group(alt(
              group(char('}')),
              group(seq(
                ignoreCase(ordalt(...placeholder.tagNames)),
                inlineSpaces0(),
                optseq(
                  char('{'),
                  anyChars0(),
                  char('}'),
                ),
              )),
            )),
          )),
          inlineSpaces0(),
          capture(char('[')),
        ),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.OpenBrace, RuleDescriptor.Begin),
        },
        end: seq(
          capture(char(']')),
          lookahead(alt(inlineSpace(), endAnchor())),
          inlineSpaces0(),
        ),
        endCaptures: {
          1: nameRule(scopeName, RuleName.CloseBrace, RuleDescriptor.End),
        },
        patterns: assignmentRulePatterns,
      },
      ...placeholder.rules,
    ],
  });
}
function createTypeDeclarationTagRule(scopeName: ScopeName, placeholder: Placeholder_BlockTag): Rule {
  return createBlockTagRule(scopeName, {
    ...placeholder,
    rules: [
      // e.g. `@xxx {type} description`
      {
        contentName: name(scopeName, TokenType.Other, RuleName.TypeInDocument),
        begin: seq(
          lookbehind(seq(
            placeholder.startPattern,
            inlineSpaces0(),
            ignoreCase(ordalt(...placeholder.tagNames)),
            inlineSpaces0(),
          )),
          capture(char('{')),
        ),
        beginCaptures: {
          1: nameRule(scopeName, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace),
        },
        end: seq(
          capture(char('}')),
          inlineSpaces0(),
          capture(anyChars0()),
          endAnchor(),
        ),
        endCaptures: {
          1: nameRule(scopeName, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace),
          2: patternsRule(includeRule(Repository.InlineTextInDocument)),
        },
      },
      // e.g. `@xxx description`
      {
        match: seq(
          lookbehind(seq(
            placeholder.startPattern,
            inlineSpaces0(),
            ignoreCase(ordalt(...placeholder.tagNames)),
          )),
          inlineSpaces0(),
          capture(seq(
            negChar('{', '\\s'),
            anyChars0(),
          )),
        ),
        captures: {
          1: patternsRule(includeRule(Repository.InlineTextInDocument)),
        },
      },
    ],
  });
}

interface Placeholder_ExampleTag {
  startPattern: string;
  identifierPattern: string;
}
function createExampleTagRule(scopeName: ScopeName, placeholder: Placeholder_ExampleTag): BeginEndRule {
  return {
    contentName: name(scopeName, RuleName.EmbeddedLanguage),
    ...createBlockTagRule(scopeName, {
      ...placeholder,
      tagNames: [
        // https://jsdoc.app/tags-example
        '@example',
      ],
      rules: [
        {
          name: name(scopeName, RuleName.CodeBegin),
          match: seq(
            lookbehind(seq(
              startAnchor(),
              inlineSpaces0(),
              char('*'),
            )),
            char(':'),
          ),
        },
        includeRule(Repository.Self),
      ],
    }),
  };
}
function createInlineLinkTagRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      optseq(
        capture(char('[')),
        capture(many0(group(alt(
          negChar(']'),
          text('\\]'),
        )))),
        capture(char(']')),
      ),
      capture(ignoreCase(text('{@link'))),
      optseq(
        inlineSpaces1(),
        capture(anyChars0()),
      ),
      capture(seq('}')),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.Begin),
      2: nameRule(scopeName, RuleName.UnquotedString),
      3: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.End),
      4: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.Begin),
      5: nameRule(scopeName, RuleName.NameOrUrlInDocument),
      6: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.End),
    },
  };
}
