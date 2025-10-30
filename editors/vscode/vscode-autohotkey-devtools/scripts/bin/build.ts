import { debugBuildOptions } from '../config';
import { build } from '../helpers/build';
import { cleanBuild } from '../helpers/clean';

// eslint-disable-next-line jest/require-hook
(async(): Promise<void> => {
  await cleanBuild();
  await build(debugBuildOptions);
})();
