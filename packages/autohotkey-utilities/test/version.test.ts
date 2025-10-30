import { version } from '../src';

describe('version', () => {
  describe('parseVersion', () => {
    test.each([
      [ '2.1.0', [ 2, 1, 0, undefined, undefined ] ],
      [ '2.0.0', [ 2, 0, 0, undefined, undefined ] ],
      [ '2.1.0-alpha.1', [ 2, 1, 0, 'alpha', 1 ] ],

      [ '2.0-rc.1', [ 2.0, undefined, undefined, 'rc', 1 ] ],
      [ '2.0-beta.1', [ 2.0, undefined, undefined, 'beta', 1 ] ],
      [ '2.0-a045', [ 2.0, undefined, undefined, 'a', 45 ] ],
      [ '2.0-a138', [ 2.0, undefined, undefined, 'a', 138 ] ],

      [ '1.1.38.02', [ 1.1, 38, 2, undefined, undefined ] ],

    ])('pass', (versionText, expectedValue) => {
      const ver = version.parseVersion(versionText);

      expect(ver).toStrictEqual(expectedValue);
      expect(ver[version.VersionComponent.Major]).toBe(expectedValue[version.VersionComponent.Major]);
      expect(ver[version.VersionComponent.Minor]).toBe(expectedValue[version.VersionComponent.Minor]);
      expect(ver[version.VersionComponent.Patch]).toBe(expectedValue[version.VersionComponent.Patch]);
      expect(ver[version.VersionComponent.PreReleaseStage]).toBe(expectedValue[version.VersionComponent.PreReleaseStage]);
      expect(ver[version.VersionComponent.PreReleasePatch]).toBe(expectedValue[version.VersionComponent.PreReleasePatch]);
    });

    test.each([
      [ '1.0.0.0' ],
      [ '2.0.0-unknown.1' ],
      [ '2.0.0-.1' ],
    ])('not support', (versionText) => {
      expect(() => version.parseVersion(versionText)).toThrow(Error);
    });
  });
});
