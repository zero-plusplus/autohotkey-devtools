import { debugBuildOptions } from '../config';
import { buildDemoAll, buildLanguageConfigurationAll, buildTmLanguageAll } from '../helpers/build';
import { cleanBuildSource } from '../helpers/clean';
import { watch } from '../helpers/watch';

// eslint-disable-next-line jest/require-hook
(async(): Promise<void> => {
  await cleanBuildSource();
  await watch(debugBuildOptions, async() => {
    await Promise.all([
      buildDemoAll(),
      buildTmLanguageAll(true),
      buildLanguageConfigurationAll(true),
    ]);
  });
})();
