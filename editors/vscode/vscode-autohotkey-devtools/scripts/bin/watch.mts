import { debugBuildOptions } from '../config.mjs';
import { buildDemoAll, buildLanguageConfigurationAll, buildTmLanguageAll } from '../helpers/build.mjs';
import { cleanBuildSource } from '../helpers/clean.mjs';
import { watch } from '../helpers/watch.mjs';

await cleanBuildSource();
await watch(debugBuildOptions, async() => {
  await Promise.all([
    buildDemoAll(),
    buildTmLanguageAll(true),
    buildLanguageConfigurationAll(),
  ]);
});
