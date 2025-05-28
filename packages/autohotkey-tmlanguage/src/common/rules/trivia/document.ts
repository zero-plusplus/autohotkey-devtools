import { Repository, RuleDescriptor, RuleName, TokenType } from '../../../constants';
import {
  alphaChar, alt, anyChars0, anyChars1, capture, char, endAnchor, group, groupMany0, groupMany1, ignoreCase,
  inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, negativeLookahead, negChar, negChars0,
  negChars1, optional, optseq, ordalt, seq, startAnchor, text,
} from '../../../oniguruma';
import type { BeginEndRule, BeginWhileRule, ElementName, MatchRule, PatternsRule, Repositories, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  leftHandPattern: string;
}
export function createDocumentCommentRepositories(scopeName: ScopeName, placeholder: Placeholder): Repositories {
  return {
    [Repository.SingleLineDocumentComment]: createSinglelineDocumentCommentRule(scopeName, placeholder),
    [Repository.InlineDocumentComment]: createInlineDocumentCommentRule(scopeName, placeholder),
    [Repository.InlineTextInDocument]: createInlineTextInDocumentRule(scopeName),
    [Repository.MultiLineDocumentComment]: createDocumentCommentRule(scopeName, placeholder),
    [Repository.TypeInDocument]: createDocumentTypeRule(scopeName),
  };
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
            leftHandPattern: placeholder.leftHandPattern,
          }),

          includeRule(Repository.FencedCodeBlockInDocument),
          includeRule(Repository.InlineTextInDocument),
          { include: 'text.html.markdown#block' },
        ],
      },
    ],
  };
}
export function createInlineDocumentCommentRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  const contentStartPattern = seq(
    inlineSpaces1(),
    text(';;'),
  );
  return {
    name: name(scopeName, RuleName.DocumentComment),
    match: seq(
      contentStartPattern,
      capture(anyChars1()),
    ),
    captures: {
      1: patternsRule(
        createTagAnnotationRule(scopeName, {
          startPattern: contentStartPattern,
          leftHandPattern: placeholder.leftHandPattern,
        }),
        includeRule(Repository.FencedCodeBlockInDocument),
        includeRule(Repository.InlineTextInDocument),
        { include: 'text.html.markdown#block' },
      ),
    },
  };
}
export function createSinglelineDocumentCommentRule(scopeName: ScopeName, placeholder: Placeholder): BeginWhileRule {
  const capturedContentStartPattern = seq(startAnchor(), inlineSpaces0(), capture(text(';;')));
  const contentStartPattern = seq(startAnchor(), inlineSpaces0(), text(';;'));

  return {
    name: name(scopeName, RuleName.DocumentComment),
    begin: capturedContentStartPattern,
    while: capturedContentStartPattern,
    patterns: [
      {
        begin: lookbehind(text(';;')),
        while: alt(startAnchor(), '\\G'),
        patterns: [
          createTagAnnotationRule(scopeName, {
            startPattern: contentStartPattern,
            leftHandPattern: placeholder.leftHandPattern,
          }),
          includeRule(Repository.FencedCodeBlockInDocument),
          includeRule(Repository.InlineTextInDocument),
          { include: 'text.html.markdown#block' },
        ],
      },
    ],
  };
}
export function createInlineTextInDocumentRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    createInlineLinkTagRule(scopeName),
    { include: 'text.html.markdown#inline' },
  );
}
export function createDocumentTypeRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: lookbehind(char('{')),
    end: lookahead(char('}')),
    patterns: [
      {
        begin: char('{'),
        end: char('}'),
        patterns: [ includeRule(Repository.TypeInDocument) ],
      },
    ],
  };
}

// #region tag
interface Placeholder_TagAnnotation {
  startPattern: string;
  leftHandPattern: string;
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

        // Tags not in jsdoc
        '@template',
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
      rules: [
        includeRule(Repository.Comma),
        includeRule(Repository.Expression),
      ],
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

    // unknown tag
    {
      match: seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        capture(seq(
          char('@'),
          groupMany0(alphaChar()),
        )),
        lookahead(alt(inlineSpace(), endAnchor())),
        inlineSpaces0(),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.DocumentTag),
      },
    },
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
  leftHandPattern: string;
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
  return createBlockTagRule(scopeName, {
    ...placeholder,
    tagNames: placeholder.tagNames,
    rules: [
      // e.g. `@param name`
      //              ^^^^
      {
        match: seq(
          lookbehind(seq(
            placeholder.startPattern,
            inlineSpaces0(),
            ignoreCase(ordalt(...placeholder.tagNames)),
            inlineSpaces0(),
          )),
          capture(seq(
            placeholder.leftHandPattern,
            optional(capture(char('*', '?'))),
          )),
          lookahead(alt(inlineSpace(), endAnchor())),
          inlineSpaces0(),
        ),
        captures: {
          1: patternsRule(includeRule(Repository.Expression)),
          2: nameRule(scopeName, RuleName.Operator),
        },
      },
      // e.g. `@param {type}`
      //              ^^^^^^
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
        end: capture(char('}')),
        endCaptures: {
          1: nameRule(scopeName, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace),
        },
        patterns: [ includeRule(Repository.TypeInDocument) ],
      },
      // e.g. `@param {type} [name := "abc"]`, `@param [name := "abc"]`
      //                     ^^^^^^^^^^^^^^^           ^^^^^^^^^^^^^^^
      {
        name: name(scopeName, TokenType.Other),
        begin: seq(
          lookbehind(seq(
            placeholder.startPattern,
            inlineSpaces0(),
            group(alt(
              groupMany1(seq(
                inlineSpaces0(),
                char('}'),
              )),
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
          1: nameRule(scopeName, RuleName.OpenBracket),
        },
        end: seq(
          capture(char(']')),
          inlineSpaces0(),
        ),
        endCaptures: {
          1: nameRule(scopeName, RuleName.CloseBracket),
        },
        patterns: [
          {
            begin: char('['),
            end: char(']'),
            patterns: [
              includeRule(Repository.Comma),
              includeRule(Repository.Expression),
            ],
          },
          includeRule(Repository.Expression),
        ],
      },
      // e.g. `@param {type} name`
      //                     ^^^^
      {
        name: name(scopeName, TokenType.Other),
        match: seq(
          lookbehind(seq(
            placeholder.startPattern,
            inlineSpaces0(),
            group(alt(
              groupMany1(seq(
                inlineSpaces0(),
                char('}'),
              )),
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
          capture(seq(
            placeholder.leftHandPattern,
            optional(capture(char('*', '?'))),
          )),
          inlineSpaces0(),
        ),
        captures: {
          1: patternsRule(includeRule(Repository.Expression)),
          2: nameRule(scopeName, RuleName.Operator),
        },
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
        patterns: [ includeRule(Repository.TypeInDocument) ],
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
  leftHandPattern: string;
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
            lookbehind(placeholder.startPattern),
            char(':'),
          ),
        },
        includeRule(Repository.Self),
      ],
    }),
  };
}
function createInlineLinkTagRule(scopeName: ScopeName): MatchRule {
  // e.g. `[text]{@link url}`, `{@link url|text}`
  return {
    match: seq(
      inlineSpaces0(),
      optseq(
        capture(char('[')),
        capture(groupMany0(alt(
          negChar(']'),
          text('\\]'),
        ))),
        capture(char(']')),
      ),
      capture(ignoreCase(text('{@link'))),
      optseq(
        inlineSpaces1(),
        capture(negChars0('}', '|')),
        optional(capture(seq(
          char('|'),
          negChars0('}'),
        ))),
      ),
      capture(seq('}')),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.Begin),
      2: nameRule(scopeName, RuleName.UnquotedString),
      3: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.End),
      4: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.Begin),
      5: nameRule(scopeName, RuleName.NameOrUrlInDocument),
      6: nameRule(scopeName, RuleName.NamePathInDocument),
      7: nameRule(scopeName, RuleName.DocumentTag, RuleDescriptor.End),
    },
  };
}
