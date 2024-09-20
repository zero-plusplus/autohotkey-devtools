import { debugBuildOptions } from '../config.mjs';
import { build } from '../helpers/build.mjs';
import { cleanBuild } from '../helpers/clean.mjs';

await cleanBuild();
await build(debugBuildOptions);
