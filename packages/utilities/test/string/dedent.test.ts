import { describe, expect, test } from '@jest/globals';
import { dedent } from '../../src';

describe('dedent', () => {
  test('dedent', () => {
    const text = 'line';

    expect(dedent`
      line 1
        ${text} 2
      ${text} 3
    `).toBe([
      'line 1',
      '  line 2',
      'line 3',
    ].join('\n'));
  });
});
