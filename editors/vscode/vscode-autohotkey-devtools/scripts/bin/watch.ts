import { debugBuildOptions } from '../config.ts';
import { buildDemoAll, buildLanguageConfigurationAll, buildTmLanguageAll } from '../helpers/build.ts';
import { cleanBuildSource } from '../helpers/clean.ts';
import { watch } from '../helpers/watch.ts';

(async(): Promise<void> => {
  await cleanBuildSource();
  watch(debugBuildOptions, async() => {
    await Promise.all([
      buildDemoAll(),
      buildTmLanguageAll(true),
      buildLanguageConfigurationAll(true),
    ]);
  });
})();
