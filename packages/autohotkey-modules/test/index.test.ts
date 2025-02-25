import { spawnSync } from 'child_process';
import * as path from 'path';
import { runtimePath, sourceDir } from './config';

describe('all tests', () => {
  test('collection', () => {
    expect(testAutoHotkey('collection')).toBeTruthy();
  });

  test('function', () => {
    expect(testAutoHotkey('function')).toBeTruthy();
  });

  test('predicate', () => {
    expect(testAutoHotkey('predicate')).toBeTruthy();
  });
});

// #region helpers
function testAutoHotkey(testName: string): boolean {
  const result = spawnSync(runtimePath, [ path.resolve(sourceDir, `${testName}.test.ahk`) ], { encoding: 'utf8' });
  console.log(result.stdout.toString());

  if (result.status) {
    return false;
  }
  return true;
}
// #endregion helpers
