import {
  CharacterCodes,
  createSyntaxTokenStream,
  TokenKinds,
} from '../../../core';
import {
  LexicalSpec,
  RawTokenTable,
  SyntaxTokenStream,
} from '../../../types';
import { scanNewLineToken } from '../../autohotkeyl';
import {
  scanBlockCommentToken,
  scanDirectiveNameToken,
  scanDoubleStringToken,
  scanIdentifierToken,
  scanLineCommentToken,
  scanNumberToken,
  scanSingleStringToken,
  scanSpaceToken,
  scanTabToken,
} from './rules';

export const rawTokenTable: RawTokenTable = {
  [CharacterCodes.Bom]: TokenKinds.Bom,
  [CharacterCodes.LineFeed]: scanNewLineToken,
  [CharacterCodes.CarriageReturn]: scanNewLineToken,
  [CharacterCodes.Space]: scanSpaceToken,
  [CharacterCodes.Tab]: scanTabToken,
  [CharacterCodes.Exclamation]: {
    [CharacterCodes.Equals]: {
      [CharacterCodes.Equals]: TokenKinds.ExclamationEqualsEquals,
      default: TokenKinds.ExclamationEquals,
    },
    default: TokenKinds.Exclamation,
  },
  [CharacterCodes.DoubleQuotation]: scanDoubleStringToken,
  [CharacterCodes.Percent]: TokenKinds.Percent,
  [CharacterCodes.Ampersand]: {
    [CharacterCodes.Ampersand]: TokenKinds.AmpersandAmpersand,
    [CharacterCodes.Equals]: TokenKinds.AmpersandEqual,
    default: TokenKinds.Ampersand,
  },
  [CharacterCodes.SingleQuotation]: scanSingleStringToken,
  [CharacterCodes.OpenParen]: TokenKinds.OpenParen,
  [CharacterCodes.CloseParen]: TokenKinds.CloseParen,
  [CharacterCodes.Asterisk]: {
    [CharacterCodes.Asterisk]: TokenKinds.AsteriskAsterisk,
    [CharacterCodes.Equals]: TokenKinds.AsteriskEquals,
    default: TokenKinds.Asterisk,
  },
  [CharacterCodes.Plus]: {
    [CharacterCodes.Plus]: TokenKinds.PlusPlus,
    [CharacterCodes.Equals]: TokenKinds.PlusEquals,
    default: TokenKinds.Plus,
  },
  [CharacterCodes.Comma]: TokenKinds.Comma,
  [CharacterCodes.Minus]: {
    [CharacterCodes.Minus]: TokenKinds.MinusMinus,
    [CharacterCodes.Equals]: TokenKinds.MinusEquals,
    default: TokenKinds.Minus,
  },
  [CharacterCodes.Dot]: {
    [CharacterCodes.Equals]: TokenKinds.DotEquals,
    default: TokenKinds.Dot,
  },
  [CharacterCodes.Slash]: {
    [CharacterCodes.Slash]: {
      [CharacterCodes.Equals]: TokenKinds.SlashSlashEquals,
      default: TokenKinds.SlashSlash,
    },
    [CharacterCodes.Asterisk]: scanBlockCommentToken,
    [CharacterCodes.Equals]: TokenKinds.SlashEquals,
    default: TokenKinds.Slash,
  },
  [CharacterCodes.Colon]: {
    [CharacterCodes.Equals]: TokenKinds.ColonEquals,
    default: TokenKinds.Colon,
  },
  [CharacterCodes.SemiColon]: scanLineCommentToken,
  [CharacterCodes.LessThan]: {
    [CharacterCodes.LessThan]: {
      [CharacterCodes.Equals]: TokenKinds.LessThanLessThanEquals,
      default: TokenKinds.LessThanLessThan,
    },
    [CharacterCodes.Equals]: TokenKinds.LessThanEquals,
    default: TokenKinds.LessThan,
  },
  [CharacterCodes.Equals]: {
    [CharacterCodes.Equals]: {
      default: TokenKinds.EqualsEquals,
    },
    [CharacterCodes.GreaterThan]: TokenKinds.EqualsGreaterThan,
    default: TokenKinds.Equals,
  },
  [CharacterCodes.GreaterThan]: {
    [CharacterCodes.GreaterThan]: {
      [CharacterCodes.GreaterThan]: {
        [CharacterCodes.Equals]: TokenKinds.GreaterThanGreaterThanGreaterThanEquals,
        default: TokenKinds.GreaterThanGreaterThanGreaterThan,
      },
      [CharacterCodes.Equals]: TokenKinds.GreaterThanGreaterThanEquals,
      default: TokenKinds.GreaterThanGreaterThan,
    },
    [CharacterCodes.Equals]: TokenKinds.GreaterThanEquals,
    default: TokenKinds.GreaterThan,
  },
  [CharacterCodes.Question]: {
    [CharacterCodes.Question]: {
      [CharacterCodes.Equals]: TokenKinds.QuestionQuestionEquals,
      default: TokenKinds.QuestionQuestion,
    },
    default: TokenKinds.Question,
  },
  [CharacterCodes.OpenBracket]: TokenKinds.OpenBracket,
  [CharacterCodes.CloseBracket]: TokenKinds.CloseBracket,
  [CharacterCodes.Caret]: {
    [CharacterCodes.Equals]: TokenKinds.CaretEquals,
    default: TokenKinds.Caret,
  },
  [CharacterCodes.OpenBrace]: TokenKinds.OpenBrace,
  [CharacterCodes.Bar]: {
    [CharacterCodes.Bar]: TokenKinds.BarBar,
    [CharacterCodes.Equals]: TokenKinds.BarEquals,
    default: TokenKinds.Bar,
  },
  [CharacterCodes.CloseBrace]: TokenKinds.CloseBrace,
  [CharacterCodes.Tilde]: {
    [CharacterCodes.Equals]: TokenKinds.TildeEquals,
    default: TokenKinds.Tilde,
  },
  [CharacterCodes.Hash]: scanDirectiveNameToken,
  [CharacterCodes._0]: scanNumberToken,
  [CharacterCodes._1]: scanNumberToken,
  [CharacterCodes._2]: scanNumberToken,
  [CharacterCodes._3]: scanNumberToken,
  [CharacterCodes._4]: scanNumberToken,
  [CharacterCodes._5]: scanNumberToken,
  [CharacterCodes._6]: scanNumberToken,
  [CharacterCodes._7]: scanNumberToken,
  [CharacterCodes._8]: scanNumberToken,
  [CharacterCodes._9]: scanNumberToken,
  default: scanIdentifierToken,
};
export const spec: LexicalSpec = {
  rawTokenTable,
  keywordTable: {},
  leadingTrivia: [
    TokenKinds.Space,
    TokenKinds.Tab,
    TokenKinds.LineComment,
    TokenKinds.BlockComment,

    TokenKinds.NewLine,
  ],
  trailingTrivia: [
    TokenKinds.Space,
    TokenKinds.Tab,
    TokenKinds.LineComment,
    TokenKinds.BlockComment,
  ],
};
export const stream: SyntaxTokenStream = createSyntaxTokenStream(spec);
