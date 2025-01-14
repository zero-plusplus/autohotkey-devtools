import type { ScopeName } from '../../src/types';
import { parse } from '../helpers/textmate-parser';
import { createExpectedDataList } from './expected';

describe('autohotkey2', () => {
  const scopeName: ScopeName = 'autohotkey2';
  const expectedDataList = createExpectedDataList(scopeName);
  const testText = expectedDataList.map((dataList) => dataList[0]).join('\n');
  const expected = expectedDataList.flatMap((dataList) => dataList[1]);

  test('all test', async() => {
    const actual = await parse(scopeName, testText);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });
});
