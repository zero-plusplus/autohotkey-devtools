import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName, TokenType } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createDocumentCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        /**
         *
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-abstract
    [
      dedent`
        /**
         * @abstract
         * @virtual
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        ...[ '@abstract', '@virtual' ].flatMap((tag) => {
          return [
            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
          ];
        }),
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-access
    [
      dedent`
        /**
         * @access package
         * @access private
         * @access protected
         * @access public
         *
         * @access module
         * @access unknown
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        ...[ 'package', 'private', 'protected', 'public' ].flatMap((accessLevel) => {
          return [
            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: '@access', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: accessLevel, scopes: name(scopeName, RuleName.DocumentComment, RuleName.KeywordInDocument) },
          ];
        }),

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },

        // Note: The access level that jsdoc does not have. In v2, modules can be defined, so they are added as aliases of package
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@access', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'module', scopes: name(scopeName, RuleName.DocumentComment, RuleName.KeywordInDocument) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@access', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'unknown', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-async
    [
      dedent`
        /**
         * @async
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@async', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-augments
    [
      dedent`
        /**
         * @augments Foo.Bar
         * @extends Foo.Bar
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        ...[ '@augments', '@extends' ].flatMap((tag) => {
          return [
            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'Foo.Bar', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
          ];
        }),
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-author
    [
      dedent`
        /**
         * @author name <mail-address>
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@author', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name <mail-address>', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-borrows
    [
      dedent`
        /**
         * @borrows a as b
         * @borrows a.b as b.c
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@borrows', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: 'as', scopes: name(scopeName, RuleName.DocumentComment, RuleName.ReservedWordInDocument) },
        { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@borrows', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'a.b', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: 'as', scopes: name(scopeName, RuleName.DocumentComment, RuleName.ReservedWordInDocument) },
        { text: 'b.c', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-class
    [
      dedent`
        /**
         * @class
         * @class {type}
         * @class {type} name
         * @class {type} name description
         * @class name
         * @class name description
         */
        /**
         * @constructor
         * @constructor {type}
         * @constructor {type} name
         * @constructor {type} name description
         * @constructor name
         * @constructor name description
         */
      `,
      [
        ...[ '@class', '@constructor' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-classdesc
    [
      dedent`
        /**
         * @classdesc descripton
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@classdesc', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'descripton', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-constant
    [
      dedent`
        /**
         * @constant
         * @constant {type}
         * @constant {type} name
         * @constant {type} name description
         * @constant name
         * @constant name description
         */
        /**
         * @const
         * @const {type}
         * @const {type} name
         * @const {type} name description
         * @const name
         * @const name description
         */
      `,
      [
        ...[ '@constant', '@const' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-constructs
    [
      dedent`
        /**
         * @constructs
         * @constructs name
         * @constructs name description
         */
      `, [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-copyright
    [
      dedent`
        /**
         * @copyright
         * @copyright description
         */
      `, [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@copyright', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@copyright', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-default
    [
      dedent`
        /**
         * @default
         * @default true
         * @default 123
         */
        /**
         * @defaultvalue
         * @defaultvalue true
         * @defaultvalue 123
         */
      `, [
        ...[ '@default', '@defaultvalue' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'true', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.KeywordLikeBuiltInVariable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-deprecated
    [
      dedent`
        /**
         * @deprecated
         * @deprecated text
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@deprecated', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@deprecated', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'text', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-description
    [
      dedent`
        /**
         * @description
         * @description description
         */
        /**
         * @desc
         * @desc description
         */
      `,
      [
        ...[ '@description', '@desc' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-enum
    [
      dedent`
        /**
         * @enum
         * @enum {type}
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@enum', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@enum', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-example
    [
      dedent`
        /**
         * @example
         *  test := 123
         */
        /**
         * @example
         *  test := 123
         * @example
         */

        /**
         * @example
         *:  test := 123
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: ':', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.CodeBegin) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-file
    [
      dedent`
        /**
         * @file
         * @file description
         */
        /**
         * @fileoverview
         * @fileoverview description
         */
        /**
         * @overview
         * @overview description
         */
      `,
      [
        ...[ '@file', '@fileoverview', '@overview' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-function
    [
      dedent`
        /**
         * @function
         * @function name
         * @function name description
         */
        /**
         * @func
         * @func name
         * @func name description
         */
        /**
         * @method
         * @method name
         * @method name description
         */
      `, [
        ...[ '@function', '@func', '@method' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-global
    [
      dedent`
        /**
         * @global
         * @global description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@global', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@global', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-ignore
    [
      dedent`
        /**
         * @ignore
         * @ignore description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@ignore', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@ignore', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-implements
    [
      dedent`
        /**
         * @implements
         * @implements {type}
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@implements', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@implements', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-override
    [
      dedent`
        /**
         * @override
         * @override description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@override', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@override', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-param
    [
      dedent`
        /**
         * @param
         * @param {type}
         * @param {type} name
         * @param {type} name description
         * @param name
         * @param name description
         */
        /**
         * @arg
         * @arg {type}
         * @arg {type} name
         * @arg {type} name description
         * @arg name
         * @arg name description
         */
        /**
         * @argument
         * @argument {type}
         * @argument {type} name
         * @argument {type} name description
         * @argument name
         * @argument name description
         */
      `,
      [
        ...[ '@param', '@arg', '@argument' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-private
    [
      dedent`
        /**
         * @private
         * @private description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@private', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@private', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-property
    [
      dedent`
        /**
         * @property
         * @property {type}
         * @property {type} name
         * @property {type} name description
         * @property name
         * @property name description
         * @property {type} a.b.c description
         * @property a.b.c description
         */
        /**
         * @prop
         * @prop {type}
         * @prop {type} name
         * @prop {type} name description
         * @prop name
         * @prop name description
         * @prop {type} a.b.c description
         * @prop a.b.c description
         */
      `,
      [
        ...[ '@property', '@prop' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'a.b.c', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'a.b.c', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-protected
    [
      dedent`
        /**
         * @protected
         * @protected description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@protected', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@protected', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-public
    [
      dedent`
        /**
         * @public
         * @public description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@public', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@public', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-readonly
    [
      dedent`
        /**
         * @readonly
         * @readonly description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@readonly', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@readonly', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-returns
    [
      dedent`
        /**
         * @returns
         * @returns {type}
         * @returns {type} description
         * @returns description
         */
        /**
         * @return
         * @return {type}
         * @return {type} description
         * @return description
         */
      `,
      [
        ...[ '@returns', '@return' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-see
    [
      dedent`
        /**
         * @see url
         * @see https://
         * @see {@link url}
         * @see [text]{@link url}
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'https://', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '[', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.DocumentComment, RuleName.UnquotedString) },
        { text: ']', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-since
    [
      dedent`
        /**
         * @since
         * @since 1.0.0
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@since', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@since', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '1.0.0', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-static
    [
      dedent`
        /**
         * @static
         * @static description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@static', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@static', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-summary
    [
      dedent`
        /**
         * @summary
         * @summary description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@summary', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@summary', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-throws
    [
      dedent`
        /**
         * @throws
         * @throws {type}
         * @throws {type} description
         * @throws description
         */
        /**
         * @exception
         * @exception {type}
         * @exception {type} description
         * @exception description
         */
      `,
      [
        ...[ '@throws', '@exception' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // https://jsdoc.app/tags-todo
    [
      dedent`
        /**
         * @todo
         * @todo description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@todo', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@todo', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // https://jsdoc.app/tags-type
    [
      dedent`
        /**
         * @type
         * @type {type}
         * @type {type} description
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@type', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@type', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@type', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    // fenced code block
    [
      dedent`
        /**
         * \`\`\`autohotkeyl
         *  test := 123
         * \`\`\`
         */
        /**
         * \`\`\`autohotkeyl
         *  test := 123
         */
        /**
         * \`\`\`autohotkeyl
         *:  test := 123
         * \`\`\`
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: 'autohotkeyl', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.LanguageName}.markdown` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Variable}.${scopeName}` },
        { text: ':=', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Operator}.${scopeName}` },
        { text: '123', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Integer}.${scopeName}` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: 'autohotkeyl', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.LanguageName}.markdown` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Variable}.${scopeName}` },
        { text: ':=', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Operator}.${scopeName}` },
        { text: '123', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Integer}.${scopeName}` },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: 'autohotkeyl', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.LanguageName}.markdown` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: ':', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.CodeBegin}.${scopeName}` },
        { text: 'test', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Variable}.${scopeName}` },
        { text: ':=', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Operator}.${scopeName}` },
        { text: '123', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Integer}.${scopeName}` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
  ];
}
