import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createFieldDeclarationExpectedData } from './field.ts';
import { createClassHeadDeclarationExpectedData } from './head.ts';
import { createMetaFunctionDeclarationExpectedData } from './metaFunction.ts';
import { createMetaPropertyDeclarationExpectedData } from './metaProperty.ts';
import { createMethodDeclarationExpectedData } from './method.ts';
import { createPropertyDeclarationExpectedData } from './property.ts';

export function createClassDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...createClassHeadDeclarationExpectedData(scopeName),
    ...createFieldDeclarationExpectedData(scopeName),
    ...createMetaFunctionDeclarationExpectedData(scopeName),
    ...createMetaPropertyDeclarationExpectedData(scopeName),
    ...createMethodDeclarationExpectedData(scopeName),
    ...createPropertyDeclarationExpectedData(scopeName),
  ];
}
