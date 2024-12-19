import { Repository, RuleDescriptor, RuleName, StyleName, TokenType } from '../../../constants';
import { alt, anyChars0, anyChars1, capture, char, endAnchor, group, ignoreCase, inlineSpaces0, keyword, lookahead, lookbehind, negativeLookahead, negChars1, optional, optseq, ordalt, seq, startAnchor, text } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, Rule, ScopeName } from '../../../types';
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
          { include: 'text.html.markdown' },
          // #endregion markdown
        ],
      },
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
    createDeclarationTagRule(scopeName, {
      ...placeholder,
      tagNames: [
        // https://jsdoc.app/tags-class
        '@class',
        '@constructor',
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
      inlineSpaces0(),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
    },
    end: endAnchor(),
    patterns: [
      {
        begin: char('-'),
        end: endAnchor(),
        patterns: [ { include: 'text.html.markdown#inline' } ],
      },
      { include: 'text.html.markdown#inline' },
    ],
  };
}

interface Placeholder_AttributeAnnotationTag {
  startPattern: string;
  tagNames: readonly string[];
  rules: Rule[];
}
// e.g. `@xxx yyyy`
function createAttributeAnnotationTagRule(scopeName: ScopeName, placeholder: Placeholder_AttributeAnnotationTag): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ordalt(...placeholder.tagNames)),
      inlineSpaces0(),
      capture(anyChars0()),
      endAnchor(),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.DocumentTag),
      2: patternsRule(...placeholder.rules),
    },
    end: endAnchor(),
    patterns: [
      {
        begin: char('-'),
        end: endAnchor(),
        patterns: [ { include: 'text.html.markdown#inline' } ],
      },
      { include: 'text.html.markdown#inline' },
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
      {
        begin: char('-'),
        end: endAnchor(),
        patterns: [ { include: 'text.html.markdown#inline' } ],
      },
      { include: 'text.html.markdown#inline' },
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
        ),
        captures: {
          1: patternsRule(includeRule(Repository.Variable)),
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
        ),
        endCaptures: {
          1: nameRule(scopeName, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace),
          2: patternsRule(includeRule(Repository.Variable)),
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
        end: capture(char(']')),
        endCaptures: {
          1: nameRule(scopeName, RuleName.CloseBrace, RuleDescriptor.End),
        },
        patterns: assignmentRulePatterns,
      },
      ...placeholder.rules,
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
