import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createFieldDeclarationExpectedData } from './field';
import { createClassHeadDeclarationExpectedData } from './head';
import { createMetaFunctionDeclarationExpectedData } from './metaFunction';
import { createMetaPropertyDeclarationExpectedData } from './metaProperty';
import { createMethodDeclarationExpectedData } from './method';
import { createPropertyDeclarationExpectedData } from './property';

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
