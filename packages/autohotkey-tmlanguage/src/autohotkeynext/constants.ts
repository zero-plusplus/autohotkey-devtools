import * as constants_v2 from '../autohotkey2/constants';

export const directiveNames: [ ...(typeof constants_v2.directiveNames), '#Module'] = [
  ...constants_v2.directiveNames,
  '#Module',
] as const;
