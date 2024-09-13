// #region types
export type PreReleaseStage = typeof preReleaseStageNames[number];
export type LegacyPreReleaseStage = typeof legacyPreReleaseStageNames[number];
export type MajorVersion = typeof majorVersions[number];
export type LegacyMajorVersion = typeof legacyMajorVersions[number];

export type AutoHotkeyVersion =
  | ReleaseVersionArray
  | PreReleaseVersionArray
  | LegacyReleaseVersionArray
  | LegacyPreReleaseVersionArray;
export type ReleaseVersionArray = [ MajorVersion, number, number, undefined, undefined ];
export type PreReleaseVersionArray = [ MajorVersion, number, number, PreReleaseStage, number ];
export type LegacyReleaseVersionArray = [ LegacyMajorVersion, number, number, undefined, undefined ];
export type LegacyPreReleaseVersionArray = [ 2.0, undefined, undefined, LegacyPreReleaseStage, number ];
// #endregion types

// #region constant
export const preReleaseStageNames = [ 'alpha', 'beta', 'rc' ] as const;
export const legacyPreReleaseStageNames = [ 'a', 'beta', 'rc' ] as const;
export const majorVersions = [
  2,
  // Be prepared to accept a value greater than 2 just in case for the very distant future
  3,
  4,
] as const;
export const legacyMajorVersions = [
  /* 1.0, */ // 1.0 is out of scope of support
  1.1,
] as const;
export const enum VersionComponent {
  Major = 0,
  Minor = 1,
  Patch = 2,
  PreReleaseStage = 3,
  PreReleasePatch = 4,
}
// #endregion constant

// #region functions
export function parseVersion(rawVersionText: string): AutoHotkeyVersion {
  const versionText = rawVersionText.trim();

  if (versionText.startsWith('2.0-')) {
    const preReleaseVersionText = versionText.slice('2.0-'.length);

    // Case 1-1: Legacy alpha release version format. e.g. 2.0-a045
    if (preReleaseVersionText.startsWith('a')) {
      const preReleasePatch = Number(preReleaseVersionText.slice('a'.length));
      if (isNaN(preReleasePatch)) {
        throw new ParseError(versionText);
      }
      const parsed: LegacyPreReleaseVersionArray = [ 2.0, undefined, undefined, 'a', preReleasePatch ];
      return parsed;
    }

    // Case 1-2: Legacy pre-release version format. e.g. 2.0-beta.1 | 2.0-rc.1
    const v2PreReleaseFormatRegExp = /^(?<preReleaseStage>beta|rc)\.((?<preReleasePatch>\d+))$/u;
    const match = preReleaseVersionText.match(v2PreReleaseFormatRegExp);
    const preReleaseStage = match?.groups?.['preReleaseStage'] as LegacyPreReleaseStage;
    const preReleasePatch = Number(match?.groups?.['preReleasePatch']);
    if (!legacyPreReleaseStageNames.includes(preReleaseStage)) {
      throw new ParseError(versionText);
    }
    const parsed: LegacyPreReleaseVersionArray = [ 2.0, undefined, undefined, preReleaseStage, preReleasePatch ];
    return parsed;
  }

  const [ releaseVersionText, preReleaseVersionText ] = versionText.split('-');
  if (releaseVersionText === undefined) {
    throw new ParseError(versionText);
  }

  const splitedReleaseVersion = releaseVersionText.split('.');
  const isLegacyVersionFormat = splitedReleaseVersion.length === 4;
  const major = Number(isLegacyVersionFormat ? `${splitedReleaseVersion[0]}.${splitedReleaseVersion[1]}` : splitedReleaseVersion[0]);
  const minor = Number(isLegacyVersionFormat ? splitedReleaseVersion[2] : splitedReleaseVersion[1]);
  const patch = Number(isLegacyVersionFormat ? splitedReleaseVersion[3] : splitedReleaseVersion[2]);
  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    throw new ParseError(versionText);
  }

  // Case 2: Legacy release version format. e.g. 1.1.37.02
  if (legacyMajorVersions.includes(major as LegacyMajorVersion)) {
    const parsed: LegacyReleaseVersionArray = [ major as LegacyMajorVersion, minor, patch, undefined, undefined ];
    return parsed;
  }

  if (!majorVersions.includes(major as MajorVersion)) {
    throw new ParseError(versionText);
  }

  // Case 3: Release version format. e.g. 2.0.0 | 2.1.0
  if (preReleaseVersionText === undefined) {
    const parsed: ReleaseVersionArray = [ major as MajorVersion, minor, patch, undefined, undefined ];
    return parsed;
  }

  // Case 4: Pre-Release version format. e.g. 2.1.0-alpha.1 | 2.1.0-beta.1 | 2.1.0-rc.1
  const splitedPreReleaseVersion = preReleaseVersionText.split('.');
  const preReleaseStage = splitedPreReleaseVersion[0] as PreReleaseStage;
  const preReleasePatch = Number(splitedPreReleaseVersion[1]);
  if (preReleaseStageNames.includes(preReleaseStage) && !isNaN(preReleasePatch)) {
    const parsed: PreReleaseVersionArray = [ major as MajorVersion, minor, patch, preReleaseStage, preReleasePatch ];
    return parsed;
  }

  throw new ParseError(versionText);
}
// #endregion functions

// #region errors
export class ParseError extends Error {
  constructor(versionText: string) {
    super(`The specified "${versionText}" failed to parse. Specify as "2.0.0", "2.1.0-alpha.1", "1.1.38.0", "2.0-a045", "2.0-beta.1" or "2.0-rc.1".`);
  }
}
// #endregion errors
