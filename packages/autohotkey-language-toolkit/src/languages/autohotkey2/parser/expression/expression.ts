import { createExpressionParser } from '../../../../core';
import type { Parser } from '../../../../types';
import { stream } from '../../lexer';
import { operatorDefinitions } from './grammar';

export const expressionParser: Parser = createExpressionParser(stream, operatorDefinitions);
