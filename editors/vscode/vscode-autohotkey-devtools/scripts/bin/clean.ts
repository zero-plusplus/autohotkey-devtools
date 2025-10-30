import { cleanBuild } from '../helpers/clean';

// eslint-disable-next-line jest/require-hook
(async(): Promise<void> => {
  await cleanBuild();
})();
