import type { ScopeName } from '../../src/types';
import { parse } from '../helpers/textmate-parser';
import type { ExpectedTestData } from '../types';
import * as dataBuilder from './expected';

describe('autohotkeyl', () => {
  const scopeName: ScopeName = 'autohotkeyl';
  const expectedDataList: ExpectedTestData[] = [
    ...dataBuilder.createBlockDeclarationExpectedData(scopeName),
    ...dataBuilder.createClassDeclarationExpectedData(scopeName),
    ...dataBuilder.createCommandStatementExpectedData(scopeName),
    ...dataBuilder.createCommentExpectedData(scopeName),
    ...dataBuilder.createContinuationSectionExpectedData(scopeName),
    ...dataBuilder.createExpressionStatementExpectedData(scopeName),
    ...dataBuilder.createForStatementExpectedData(scopeName),
    ...dataBuilder.createFunctionDeclarationExpectedData(scopeName),
    ...dataBuilder.createHotkeyLabelStatementExpectedData(scopeName),
    ...dataBuilder.createHotstringLabelStatementExpectedData(scopeName),
    ...dataBuilder.createIfStatementExpectedData(scopeName),
    ...dataBuilder.createIncludeStatementExpectedData(scopeName),
    ...dataBuilder.createLabelStatementExpectedData(scopeName),
    ...dataBuilder.createLegacyAssignmentStatementExpectedData(scopeName),
    ...dataBuilder.createLoopStatementExpectedData(scopeName),
    ...dataBuilder.createModifierDeclarationExpectedData(scopeName),
    ...dataBuilder.createSwitchStatementExpectedData(scopeName),
    ...dataBuilder.createThrowStatementExpectedData(scopeName),
    ...dataBuilder.createTryStatementExpectedData(scopeName),
    ...dataBuilder.createUntilStatementExpectedData(scopeName),
    ...dataBuilder.createWhileStatementExpectedData(scopeName),
  ];
  const testText = expectedDataList.map((dataList) => dataList[0]).join('\n');
  const expected = expectedDataList.flatMap((dataList) => dataList[1]);

  test('all test', async() => {
    const actual = await parse(scopeName, testText);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });
});
