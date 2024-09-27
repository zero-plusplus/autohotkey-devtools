import { RuleName, MatchRule, Repository, Repositories, BeginEndRule, PatternsRule, ScopeName } from '../../types';
import { createUtilities } from '../../utils';

// [Escape Sequences](https://www.autohotkey.com/docs/v1/misc/EscapeChar.htm)
export const commonEscapeSequences: string[] = [ '`,', '`%', '``', '`;', '`::', '`r', '`n', '`b', '`t', '`v', '`a', '`f' ] as const;
export const doubleStringEscapeSequences: string[] = [ ...commonEscapeSequences, `""` ] as const;

export const integer = '[1-9][0-9]*|0';
export const hexPrefix = '0[xX]';
export const hexValue = '[0-9a-fA-F]+';
export const hex = `${hexPrefix}${hexValue}` as string;

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { name, nameRule, includeRule } = createUtilities(scopeName);

  return {
    [Repository.Literal]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.DoubleString),
          includeRule(Repository.Number),
        ],
      };
    })(),

    // #region string
    [Repository.String]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.DoubleString) ],
      };
    })(),
    [Repository.DoubleString]: ((): BeginEndRule => {
      return {
        name: name(RuleName.DoubleString),
        begin: '(?<!")(")',
        beginCaptures: {
          1: nameRule(RuleName.StringBegin),
        },
        end: '(")(?!")',
        endCaptures: {
          1: nameRule(RuleName.StringEnd),
        },
        patterns: [
          includeRule(Repository.InvalidStringNewLine),
          includeRule(Repository.InvalidStringContent),
          includeRule(Repository.DoubleStringEscapeSequence),
        ],
      };
    })(),
    [Repository.InvalidStringContent]: ((): MatchRule => {
      return {
        match: '(.)(?=\\r\\n|\\n)',
        captures: {
          1: nameRule(RuleName.InvalidSingleLineStringContent),
        },
      };
    })(),
    [Repository.InvalidStringNewLine]: ((): PatternsRule => {
      return {
        patterns: [
          {
            match: '(\\r\\n)',
            captures: {
              1: nameRule(RuleName.InvalidStringNewLine),
            },
          },
          {
            match: '(\\r|\\n)',
            captures: {
              1: nameRule(RuleName.InvalidStringNewLine),
            },
          },
        ],
      };
    })(),
    [Repository.DoubleStringEscapeSequence]: ((): MatchRule => {
      return {
        name: name(RuleName.DoubleStringEscapeSequence),
        match: `(${doubleStringEscapeSequences.join('|')})(?!(\\r\\n|\\n))`,
      };
    })(),
    // #endregion string

    // #region number
    [Repository.Number]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Integer),
          includeRule(Repository.InvalidFloat),
          includeRule(Repository.Float),
          includeRule(Repository.InvalidHex),
          includeRule(Repository.Hex),
          includeRule(Repository.InvalidScientificNotation),
          includeRule(Repository.ScientificNotation),
        ],
      };
    })(),
    [Repository.Integer]: ((): MatchRule => {
      return {
        match: `(?<=\\b)(\\d+)(?!\\.)(?=\\b)`,
        captures: {
          1: nameRule(RuleName.Integer),
        },
      };
    })(),
    [Repository.Float]: ((): MatchRule => {
      return {
        name: name(RuleName.Float),
        match: `(?<=\\b)(\\d+)(\\.)(\\d+)(?=\\b)`,
        captures: {
          1: nameRule(RuleName.Integer),
          2: nameRule(RuleName.DecimalPoint),
          3: nameRule(RuleName.DecimalPart),
        },
      };
    })(),
    [Repository.InvalidFloat]: ((): PatternsRule => {
      return {
        patterns: [
          {
            name: name(RuleName.Float),
            match: `(?<=\\b)(\\d+)(\\.)(?!\\d)`,
            captures: {
              1: nameRule(RuleName.Integer),
              2: nameRule(RuleName.DecimalPoint, RuleName.InvalidNumber),
            },
          },
        ],
      };
    })(),
    [Repository.Hex]: ((): MatchRule => {
      return {
        name: name(RuleName.Hex),
        match: `(?<=\\b)(${hexPrefix})(${hexValue})(?=\\b)`,
        captures: {
          1: nameRule(RuleName.HexPrefix),
          2: nameRule(RuleName.HexValue),
        },
      };
    })(),
    [Repository.InvalidHex]: ((): PatternsRule => {
      return {
        patterns: [
          {
            match: `(\\d+)((${hexPrefix})(${hexValue})?)`,
            captures: {
              1: nameRule(RuleName.HexPrefix, RuleName.InvalidNumber),
              2: nameRule(RuleName.Hex),
              3: nameRule(RuleName.HexPrefix),
              4: nameRule(RuleName.HexValue),
            },
          },
          {
            match: `(?i)(0)(x)(?!${hexValue})`,
            captures: {
              1: nameRule(RuleName.Hex, RuleName.HexPrefix),
              2: nameRule(RuleName.Hex, RuleName.HexPrefix, RuleName.InvalidNumber),
            },
          },
          {
            match: `(?i)(${hexPrefix})(${hexValue})(\\.\\d*)`,
            captures: {
              1: nameRule(RuleName.Hex, RuleName.HexPrefix),
              2: nameRule(RuleName.Hex, RuleName.HexValue),
              3: nameRule(RuleName.DecimalPoint, RuleName.InvalidNumber),
            },
          },
        ],
      };
    })(),
    [Repository.ScientificNotation]: ((): MatchRule => {
      return {
        match: `(?i)(?<=\\b)(?:(${integer})(\\.)(\\d+)|(${integer}))(e)([+-])?(\\d+)(?=\\b)`,
        captures: {
          1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
          2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
          3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
          4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
          5: nameRule(RuleName.ScientificNotation, RuleName.ENotation),
          6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign),
          7: nameRule(RuleName.ScientificNotation, RuleName.Exponent),
        },
      };
    })(),
    [Repository.InvalidScientificNotation]: ((): PatternsRule => {
      return {
        patterns: [
          // 123.0e+1.
          //         ^ Invalid
          {
            match: `(?i)(?<=\\b)(?:(${integer})(\\.)(\\d+)|(${integer}))(e)([+-])?(\\d+)(\\.)`,
            captures: {
              1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
              2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
              3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
              4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
              5: nameRule(RuleName.ScientificNotation, RuleName.ENotation),
              6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign),
              7: nameRule(RuleName.ScientificNotation, RuleName.Exponent),
              8: nameRule(RuleName.ScientificNotation, RuleName.DecimalPart, RuleName.InvalidNumber),
            },
          },
          // 123.0e+
          //        ^ Missing
          {
            match: `(?i)(?:(${integer})(\\.)(\\d+)|(${integer}))(e)([+-])(?![0-9])`,
            captures: {
              1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
              2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
              3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
              4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
              5: nameRule(RuleName.ScientificNotation, RuleName.ENotation),
              6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign, RuleName.InvalidNumber),
            },
          },
          // 123.0e
          //       ^ Missing
          {
            match: `(?i)(?:(${integer})(\\.)(\\d+)|(${integer}))(e)(?![\\+\\-0-9])`,
            captures: {
              1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
              2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
              3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
              4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
              5: nameRule(RuleName.ScientificNotation, RuleName.ENotation, RuleName.InvalidNumber),
            },
          },
        ],
      };
    })(),
    // #endregion number
  };
}
