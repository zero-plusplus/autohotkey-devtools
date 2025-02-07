import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName, TokenType } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createDocumentCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        /**
         *
         */

        ;;
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
      ],
    ],
    // https://jsdoc.app/tags-abstract
    [
      dedent`
        /**
         * @abstract
         * @virtual
         */

        ;; @abstract
        ;; @virtual
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        ...[ '@abstract', '@virtual' ].flatMap((tag) => {
          return [
            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
          ];
        }),
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        ...[ '@abstract', '@virtual' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
          ];
        }),
        // #endregion line
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

        ;; @access package
        ;; @access private
        ;; @access protected
        ;; @access public

        ;; @access module
        ;; @access unknown
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        ...[ 'package', 'private', 'protected', 'public' ].flatMap((accessLevel) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: '@access', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: accessLevel, scopes: name(scopeName, RuleName.DocumentComment, RuleName.KeywordInDocument) },
          ];
        }),

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@access', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'module', scopes: name(scopeName, RuleName.DocumentComment, RuleName.KeywordInDocument) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@access', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'unknown', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-async
    [
      dedent`
        /**
         * @async
         */

        ;; @async
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@async', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@async', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-augments
    [
      dedent`
        /**
         * @augments Foo.Bar
         * @extends Foo.Bar
         */

        ;; @augments Foo.Bar
        ;; @extends Foo.Bar
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        ...[ '@augments', '@extends' ].flatMap((tag) => {
          return [
            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'Foo.Bar', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
          ];
        }),
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        ...[ '@augments', '@extends' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'Foo.Bar', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-author
    [
      dedent`
        /**
         * @author name <mail-address>
         */

        ;; @author name <mail-address>
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@author', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name <mail-address>', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@author', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name <mail-address>', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-borrows
    [
      dedent`
        /**
         * @borrows a as b
         * @borrows a.b as b.c
         */

        ;; @borrows a as b
        ;; @borrows a.b as b.c
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@borrows', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: 'as', scopes: name(scopeName, RuleName.DocumentComment, RuleName.ReservedWordInDocument) },
        { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@borrows', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'a.b', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: 'as', scopes: name(scopeName, RuleName.DocumentComment, RuleName.ReservedWordInDocument) },
        { text: 'b.c', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        // #endregion line
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

        ;; @class
        ;; @class {type}
        ;; @class {type} name
        ;; @class {type} name description
        ;; @class name
        ;; @class name description

        ;; @constructor
        ;; @constructor {type}
        ;; @constructor {type} name
        ;; @constructor {type} name description
        ;; @constructor name
        ;; @constructor name description
      `,
      [
        // #region block
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
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
        // #endregion block

        // #region line
        ...[ '@class', '@constructor' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-classdesc
    [
      dedent`
        /**
         * @classdesc descripton
         */

        ;; @classdesc descripton
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@classdesc', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'descripton', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@classdesc', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'descripton', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
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


        ;; @constant
        ;; @constant {type}
        ;; @constant {type} name
        ;; @constant {type} name description
        ;; @constant name
        ;; @constant name description

        ;; @const
        ;; @const {type}
        ;; @const {type} name
        ;; @const {type} name description
        ;; @const name
        ;; @const name description
      `,
      [
        // #region block
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
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
        // #endregion block

        // #region line
        ...[ '@constant', '@const' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
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

        ;; @constructs
        ;; @constructs name
        ;; @constructs name description
      `, [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@constructs', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-copyright
    [
      dedent`
        /**
         * @copyright
         * @copyright description
         */

        ;; @copyright
        ;; @copyright description
      `, [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@copyright', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@copyright', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region block
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@copyright', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@copyright', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion block
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

        ;; @default
        ;; @default true
        ;; @default 123

        ;; @defaultvalue
        ;; @defaultvalue true
        ;; @defaultvalue 123
      `, [
        // #region block
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
        // #endregion block

        // #region line
        ...[ '@default', '@defaultvalue' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'true', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.KeywordLikeBuiltInVariable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-deprecated
    [
      dedent`
        /**
         * @deprecated
         * @deprecated text
         */

        ;; @deprecated
        ;; @deprecated text
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@deprecated', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@deprecated', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'text', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@deprecated', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@deprecated', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'text', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
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

        ;; @description
        ;; @description description

        ;; @desc
        ;; @desc description
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        ...[ '@description', '@desc' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-enum
    [
      dedent`
        /**
         * @enum
         * @enum {type}
         */

        ;; @enum
        ;; @enum {type}
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@enum', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@enum', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@enum', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@enum', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        // #endregion line
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

        ;; @example
        ;;  test := 123
        ;; @example
        ;;  test := 123
        ;; @example

        ;; @example
        ;;:  test := 123
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: ':', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.CodeBegin) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.EmbeddedLanguage, RuleName.Integer) },
        // #endregion line
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

        ;; @file
        ;; @file description

        ;; @fileoverview
        ;; @fileoverview description

        ;; @overview
        ;; @overview description
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        ...[ '@file', '@fileoverview', '@overview' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
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

        ;; @function
        ;; @function name
        ;; @function name description

        ;; @func
        ;; @func name
        ;; @func name description

        ;; @method
        ;; @method name
        ;; @method name description
      `, [
        // #region block
        ...[ '@function', '@func', '@method' ].flatMap((tag) => {
          return [
            { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
        // #endregion block

        // #region line
        ...[ '@function', '@func', '@method' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-global
    [
      dedent`
        /**
         * @global
         * @global description
         */

        ;; @global
        ;; @global description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@global', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@global', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@global', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@global', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-ignore
    [
      dedent`
        /**
         * @ignore
         * @ignore description
         */

        ;; @ignore
        ;; @ignore description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@ignore', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@ignore', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@ignore', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@ignore', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-implements
    [
      dedent`
        /**
         * @implements
         * @implements {type}
         */

        ;; @implements
        ;; @implements {type}
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@implements', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@implements', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@implements', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@implements', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-override
    [
      dedent`
        /**
         * @override
         * @override description
         */

        ;; @override
        ;; @override description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@override', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@override', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@override', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@override', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
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
         * @param {type} [name := ""] description
         * @param name
         * @param name description
         * @param [name := ""] description
         */
        /**
         * @arg
         * @arg {type}
         * @arg {type} name
         * @arg {type} name description
         * @arg {type} [name := ""] description
         * @arg name
         * @arg name description
         * @arg [name := ""] description
         */
        /**
         * @argument
         * @argument {type}
         * @argument {type} name
         * @argument {type} name description
         * @argument {type} [name := ""] description
         * @argument name
         * @argument name description
         * @argument [name := ""] description
         */

        ;; @param
        ;; @param {type}
        ;; @param {type} name
        ;; @param {type} name description
        ;; @param {type} [name := ""] description
        ;; @param name
        ;; @param name description
        ;; @param [name := ""] description

        ;; @arg
        ;; @arg {type}
        ;; @arg {type} name
        ;; @arg {type} name description
        ;; @arg {type} [name := ""] description
        ;; @arg name
        ;; @arg name description
        ;; @arg [name := ""] description

        ;; @argument
        ;; @argument {type}
        ;; @argument {type} name
        ;; @argument {type} name description
        ;; @argument {type} [name := ""] description
        ;; @argument name
        ;; @argument name description
        ;; @argument [name := ""] description
      `,
      [
        // #region block
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
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: '[', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.OpenBracket) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ']', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.CloseBracket) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '[', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.OpenBracket) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ']', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.CloseBracket) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
        // #endregion block

        // #region line
        ...[ '@param', '@arg', '@argument' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: '[', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.OpenBracket) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ']', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.CloseBracket) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '[', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.OpenBracket) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: '"', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ']', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.CloseBracket) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-private
    [
      dedent`
        /**
         * @private
         * @private description
         */

        ;; @private
        ;; @private description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@private', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@private', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@private', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@private', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
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

        ;; @property
        ;; @property {type}
        ;; @property {type} name
        ;; @property {type} name description
        ;; @property name
        ;; @property name description
        ;; @property {type} a.b.c description
        ;; @property a.b.c description

        ;; @prop
        ;; @prop {type}
        ;; @prop {type} name
        ;; @prop {type} name description
        ;; @prop name
        ;; @prop name description
        ;; @prop {type} a.b.c description
        ;; @prop a.b.c description
      `,
      [
        // #region block
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
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'c', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'c', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
          ];
        }),
        // #endregion block

        // #region line
        ...[ '@property', '@prop' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'c', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
            { text: 'c', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-protected
    [
      dedent`
        /**
         * @protected
         * @protected description
         */

        ;; @protected
        ;; @protected description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@protected', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@protected', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@protected', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@protected', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-public
    [
      dedent`
        /**
         * @public
         * @public description
         */

        ;; @public
        ;; @public description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@public', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@public', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@public', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@public', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-readonly
    [
      dedent`
        /**
         * @readonly
         * @readonly description
         */

        ;; @readonly
        ;; @readonly description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@readonly', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@readonly', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@readonly', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@readonly', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
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

        ;; @returns
        ;; @returns {type}
        ;; @returns {type} description
        ;; @returns description

        ;; @return
        ;; @return {type}
        ;; @return {type} description
        ;; @return description
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        ...[ '@returns', '@return' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
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
         * @see {@link url|text}
         */

        ;; @see url
        ;; @see https://
        ;; @see {@link url}
        ;; @see [text]{@link url}
        ;; @see {@link url|text}
      `,
      [
        // #region block
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

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '|text', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'https://', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '[', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.DocumentComment, RuleName.UnquotedString) },
        { text: ']', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@see', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '|text', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-since
    [
      dedent`
        /**
         * @since
         * @since 1.0.0
         */

        ;; @since
        ;; @since 1.0.0
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@since', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@since', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '1.0.0', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@since', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@since', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '1.0.0', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-static
    [
      dedent`
        /**
         * @static
         * @static description
         */

        ;; @static
        ;; @static description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@static', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@static', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@static', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@static', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-summary
    [
      dedent`
        /**
         * @summary
         * @summary description
         */

        ;; @summary
        ;; @summary description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@summary', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@summary', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@summary', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@summary', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
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

        ;; @throws
        ;; @throws {type}
        ;; @throws {type} description
        ;; @throws description

        ;; @exception
        ;; @exception {type}
        ;; @exception {type} description
        ;; @exception description
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        ...[ '@throws', '@exception' ].flatMap((tag) => {
          return [
            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
            { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
            { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

            { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
            { text: tag, scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
            { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
          ];
        }),
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-todo
    [
      dedent`
        /**
         * @todo
         * @todo description
         */

        ;; @todo
        ;; @todo description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@todo', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@todo', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@todo', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@todo', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
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

        ;; @type
        ;; @type {type}
        ;; @type {type} description
      `,
      [
        // #region block
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
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@type', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@type', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@type', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-typedef
    [
      dedent`
        /**
         * @typedef
         * @typedef {type}
         * @typedef {type} name
         * @typedef {type} name description
         * @typedef {type} a.b.c description
         */

        ;; @typedef
        ;; @typedef {type}
        ;; @typedef {type} name
        ;; @typedef {type} name description
        ;; @typedef {type} a.b.c description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
        { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
        { text: 'c', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'name', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: 'type', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: 'a', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
        { text: 'b', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Dot) },
        { text: 'c', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.Variable) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // https://jsdoc.app/tags-version
    [
      dedent`
        /**
         * @version
         * @version description
         */

        ;; @version
        ;; @version description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@version', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@version', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@version', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@version', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    [
      dedent`
        /**
         * {@link url}
         * [text]{@link url}
         */

        ;; {@link url}
        ;; [text]{@link url}
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '[', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.DocumentComment, RuleName.UnquotedString) },
        { text: ']', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '[', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.DocumentComment, RuleName.UnquotedString) },
        { text: ']', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },
        { text: '{@link', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.Begin) },
        { text: 'url', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NameOrUrlInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag, RuleDescriptor.End) },
        // #endregion line
      ],
    ],
    // unknown tag name
    [
      dedent`
        /**
         * @unknown
         * @unknown description
         */

        ;; @unknown
        ;; @unknown description
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@unknown', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@unknown', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },

        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@unknown', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@unknown', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'description', scopes: name(scopeName, RuleName.DocumentComment) },
        // #endregion line
      ],
    ],
    // fenced code block
    [
      dedent`
        /**
         * \`\`\`${scopeName}
         *  test := 123
         * \`\`\`
         */
        /**
         * \`\`\`${scopeName}
         *  test := 123
         */
        /**
         * \`\`\`${scopeName}
         *:  test := 123
         * \`\`\`
         */
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: scopeName, scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.LanguageName}.markdown` },
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
        { text: scopeName, scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.LanguageName}.markdown` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Variable}.${scopeName}` },
        { text: ':=', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Operator}.${scopeName}` },
        { text: '123', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Integer}.${scopeName}` },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: scopeName, scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.LanguageName}.markdown` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: ':', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.CodeBegin}.${scopeName}` },
        { text: 'test', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Variable}.${scopeName}` },
        { text: ':=', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Operator}.${scopeName}` },
        { text: '123', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.EmbeddedLanguage}.${scopeName} ${RuleName.Integer}.${scopeName}` },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: `${RuleName.DocumentComment}.${scopeName} ${RuleName.FencedCodeBlock}.markdown ${RuleName.CodeFence}.markdown` },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block
      ],
    ],

    // type patterns
    [
      dedent`
        /**
         * @typedef {{{}}}
         * @typedef {{ key: "value" }}
         */

        ;; @typedef {{{}}}
        ;; @typedef {{ key: "value" }}
      `,
      [
        // #region block
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: ' key: "value" ', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        // #endregion block

        // #region line
        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },

        { text: ';;', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@typedef', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.OpenBrace) },
        { text: '{', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: ' key: "value" ', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument) },
        { text: '}', scopes: name(scopeName, RuleName.DocumentComment, TokenType.Other, RuleName.TypeInDocument, RuleName.CloseBrace) },
        // #endregion line
      ],
    ],

    // Tags not in jsdoc
    [
      dedent`
        /**
         * @template T
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@template', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: 'T', scopes: name(scopeName, RuleName.DocumentComment, RuleName.NamePathInDocument) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
  ];
}
