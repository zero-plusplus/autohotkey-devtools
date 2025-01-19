import type { ScopeName } from '../../../../../src/types';
import type { ExpectedTestData } from '../../../../types';
import { createClassHeadDeclarationExpectedData } from './head';
import { createPropertyDeclarationExpectedData } from './property';

export * from './head';
export * from './property';
export function createClassDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...createClassHeadDeclarationExpectedData(scopeName),
    ...createPropertyDeclarationExpectedData(scopeName),
  ];
}
