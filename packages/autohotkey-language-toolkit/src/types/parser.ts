import { SyntaxElement } from './factory';

export interface OperatorDefinition {
  bindingPower: number;
  associative?: 'left' | 'right';
}
export type OperatorDefinitions = Record<string, OperatorDefinition>;
export interface ExpressionParserConfig {
  operators: {
    prefix: OperatorDefinitions;
    infix: OperatorDefinitions;
    postfix: OperatorDefinitions;
  };
}

export interface Parser {
  parse: (source: string) => SyntaxElement;
}
