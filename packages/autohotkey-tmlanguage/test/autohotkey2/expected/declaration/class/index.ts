import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createClassHeadDeclarationExpectedData } from './head';
import { createMethodDeclarationExpectedData } from './method';
import { createPropertyDeclarationExpectedData } from './property';

export * from './head';
export * from './property';
export function createClassDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...createClassHeadDeclarationExpectedData(scopeName),
    ...createMethodDeclarationExpectedData(scopeName),
    ...createPropertyDeclarationExpectedData(scopeName),
  ];
}
