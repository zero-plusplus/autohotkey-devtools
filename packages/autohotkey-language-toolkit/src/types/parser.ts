import { SyntaxElement } from './factory';

export interface InfixOperatorDefinition {
  bindingPower: number;
  associative?: 'left' | 'right';
}
export interface CircumfixOperatorDefinition {
  kind: string;
  close: string;
  bindingPower: number;
}
export type InfixOperatorDefinitions = Record<string, InfixOperatorDefinition>;
export type CircumfixOperatorDefinitions = Record<string, CircumfixOperatorDefinition>;
export interface ExpressionParserConfig {
  operators: {
    prefix: InfixOperatorDefinitions;
    infix: InfixOperatorDefinitions;
    postfix: InfixOperatorDefinitions;

    circumfix: CircumfixOperatorDefinitions;
    postcircumfix: CircumfixOperatorDefinitions;
  };
}

export interface ExpressionParser {
  readonly config: ExpressionParserConfig;
  parse: (source: string) => SyntaxElement;
}
