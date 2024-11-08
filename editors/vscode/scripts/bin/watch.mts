import { debugBuildOptions } from '../config.mjs';
import { buildLanguageConfigurationAll, buildTmLanguageAll } from '../helpers/build.mjs';
import { cleanBuild } from '../helpers/clean.mjs';
import { watch } from '../helpers/watch.mjs';

await cleanBuild();
await watch(debugBuildOptions, async() => {
  await Promise.all([
    buildTmLanguageAll(true),
    buildLanguageConfigurationAll(),
  ]);
});
