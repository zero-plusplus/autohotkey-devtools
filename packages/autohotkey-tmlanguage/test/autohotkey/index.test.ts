import type { ScopeName } from '../../src/types';
import { parse } from '../helpers/textmate-parser';
import { createExpectedDataList } from './expected';

describe('autohotkey', () => {
  const scopeName: ScopeName = 'autohotkey';
  const expectedDataList = createExpectedDataList(scopeName);
  const testText = expectedDataList.map((dataList) => dataList[0]).join('\n');
  const expected = expectedDataList.flatMap((dataList) => dataList[1]);

  test('all test', async() => {
    const actual = await parse(scopeName, testText);
    // console.log(JSON.stringify(actual, undefined, 2));

    // actual.forEach((actualValue, index) => {
    //   const expectedValue = expected.at(index);
    //
    //   console.log(index);
    //
    //   expect(actualValue).toStrictEqual(expectedValue);
    // });

    expect(actual).toStrictEqual(expected);
  });
});
