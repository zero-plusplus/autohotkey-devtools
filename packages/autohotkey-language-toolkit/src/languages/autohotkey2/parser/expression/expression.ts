import { createExpressionParser } from '../../../../core';
import type { ExpressionParser } from '../../../../types';
import { stream } from '../../lexer';
import { expressionParserConfig } from './grammar';

export const expressionParser: ExpressionParser = createExpressionParser(stream, expressionParserConfig);
