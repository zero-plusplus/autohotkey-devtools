import { debugBuildOptions } from '../config.ts';
import { build } from '../helpers/build.ts';
import { cleanBuild } from '../helpers/clean.ts';

(async(): Promise<void> => {
  await cleanBuild();
  await build(debugBuildOptions);
})();
