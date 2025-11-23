import { scanStringToken } from '../../../autohotkey2/scanner/default/string';
import { scanFromTokenMap } from '../../../core/scanner';
import {
  CharacterCodes,
  TokenKind,
} from '../../../core/scanner/constants';
import type {
  ScannerMode,
  TokenMap,
} from '../../../core/scanner/types';
import {
  scanBlockCommentToken,
  scanLineCommentToken,
} from './comment';
import { scanIdentifierToken } from './identifier';
import { scanNumberToken } from './number';

export const defaultTokenMapForAhk2: TokenMap = {
  [CharacterCodes.Tab]: TokenKind.Tab,
  [CharacterCodes.LineFeed]: TokenKind.Linefeed,
  [CharacterCodes.CarriageReturn]: TokenKind.CarriageReturn,
  [CharacterCodes.Space]: TokenKind.Space,
  [CharacterCodes.Exclamation]: {
    [CharacterCodes.Equals]: {
      [CharacterCodes.Equals]: TokenKind.ExclamationEqualsEquals,
      '': TokenKind.ExclamationEquals,
    },
    '': TokenKind.Exclamation,
  },
  [CharacterCodes.DoubleQuotation]: scanStringToken,
  [CharacterCodes.Percent]: TokenKind.Percent,
  [CharacterCodes.Ampersand]: {
    [CharacterCodes.Ampersand]: TokenKind.AmpersandAmpersand,
    [CharacterCodes.Equals]: TokenKind.AmpersandEqual,
    '': TokenKind.Ampersand,
  },
  [CharacterCodes.SingleQuotation]: scanStringToken,
  [CharacterCodes.OpenParen]: TokenKind.OpenParen,
  [CharacterCodes.CloseParen]: TokenKind.CloseParen,
  [CharacterCodes.Asterisk]: {
    [CharacterCodes.Asterisk]: TokenKind.AsteriskAsterisk,
    [CharacterCodes.Equals]: TokenKind.AsteriskEquals,
    '': TokenKind.Asterisk,
  },
  [CharacterCodes.Plus]: {
    [CharacterCodes.Plus]: TokenKind.PlusPlus,
    [CharacterCodes.Equals]: TokenKind.PlusEquals,
    '': TokenKind.Plus,
  },
  [CharacterCodes.Comma]: TokenKind.Comma,
  [CharacterCodes.Minus]: {
    [CharacterCodes.Minus]: TokenKind.MinusMinus,
    [CharacterCodes.Equals]: TokenKind.MinusEquals,
    '': TokenKind.Minus,
  },
  [CharacterCodes.Dot]: {
    [CharacterCodes.Equals]: TokenKind.DotEquals,
    '': TokenKind.Dot,
  },
  [CharacterCodes.Slash]: {
    [CharacterCodes.Slash]: {
      [CharacterCodes.Equals]: TokenKind.SlashSlashEquals,
      '': TokenKind.SlashSlash,
    },
    [CharacterCodes.Asterisk]: scanBlockCommentToken,
    [CharacterCodes.Equals]: TokenKind.SlashEquals,
    '': TokenKind.Slash,
  },
  [CharacterCodes.Colon]: {
    [CharacterCodes.Equals]: TokenKind.ColonEquals,
    '': TokenKind.Colon,
  },
  [CharacterCodes.SemiColon]: scanLineCommentToken,
  [CharacterCodes.LessThan]: {
    [CharacterCodes.LessThan]: {
      [CharacterCodes.Equals]: TokenKind.LessThanLessThanEquals,
      '': TokenKind.LessThanLessThan,
    },
    [CharacterCodes.Equals]: TokenKind.LessThanEquals,
    '': TokenKind.LessThan,
  },
  [CharacterCodes.Equals]: {
    [CharacterCodes.Equals]: {
      '': TokenKind.EqualsEquals,
    },
    [CharacterCodes.GreaterThan]: TokenKind.EqualsGreaterThan,
    '': TokenKind.Equals,
  },
  [CharacterCodes.GreaterThan]: {
    [CharacterCodes.GreaterThan]: {
      [CharacterCodes.GreaterThan]: {
        [CharacterCodes.Equals]: TokenKind.GreaterThanGreaterThanGreaterThanEquals,
        '': TokenKind.GreaterThanGreaterThanGreaterThan,
      },
      [CharacterCodes.Equals]: TokenKind.GreaterThanGreaterThanEquals,
      '': TokenKind.GreaterThanGreaterThan,
    },
    [CharacterCodes.Equals]: TokenKind.GreaterThanEquals,
    '': TokenKind.GreaterThan,
  },
  [CharacterCodes.Question]: {
    [CharacterCodes.Question]: {
      [CharacterCodes.Equals]: TokenKind.QuestionQuestionEquals,
      '': TokenKind.QuestionQuestion,
    },
    '': TokenKind.Question,
  },
  [CharacterCodes.OpenBracket]: TokenKind.OpenBracket,
  [CharacterCodes.CloseBracket]: TokenKind.CloseBracket,
  [CharacterCodes.Caret]: {
    [CharacterCodes.Equals]: TokenKind.CaretEquals,
    '': TokenKind.Caret,
  },
  [CharacterCodes.OpenBrace]: TokenKind.OpenBrace,
  [CharacterCodes.Bar]: {
    [CharacterCodes.Bar]: TokenKind.BarBar,
    [CharacterCodes.Equals]: TokenKind.BarEquals,
    '': TokenKind.Bar,
  },
  [CharacterCodes.CloseBrace]: TokenKind.CloseBrace,
  [CharacterCodes.Tilde]: {
    [CharacterCodes.Equals]: TokenKind.TildeEquals,
    '': TokenKind.Tilde,
  },
  [CharacterCodes.Bom]: TokenKind.Bom,
  [CharacterCodes._1]: scanNumberToken,
  [CharacterCodes._2]: scanNumberToken,
  [CharacterCodes._3]: scanNumberToken,
  [CharacterCodes._4]: scanNumberToken,
  [CharacterCodes._5]: scanNumberToken,
  [CharacterCodes._6]: scanNumberToken,
  [CharacterCodes._7]: scanNumberToken,
  [CharacterCodes._8]: scanNumberToken,
  [CharacterCodes._9]: scanNumberToken,
  [CharacterCodes._0]: scanNumberToken,
  '': scanIdentifierToken,
};

export const defaultScanModeForAhk2: ScannerMode = {
  name: 'default',
  behavior: (cursor) => {
    return scanFromTokenMap(defaultTokenMapForAhk2, cursor);
  },
};
