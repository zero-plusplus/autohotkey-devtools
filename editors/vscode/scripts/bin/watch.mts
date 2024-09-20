import { watch } from '../helpers/watch.mjs';
import { debugBuildOptions } from '../config.mjs';
import { cleanBuild } from '../helpers/clean.mjs';
import { buildLanguageConfigurationAll, buildTmLanguageAll } from '../helpers/build.mjs';

await cleanBuild();
await watch(debugBuildOptions, async() => {
  await Promise.all([
    buildTmLanguageAll(),
    buildLanguageConfigurationAll(),
  ]);
});
