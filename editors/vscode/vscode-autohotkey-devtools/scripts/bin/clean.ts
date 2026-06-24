import { cleanBuild } from '../helpers/clean.ts';

(async(): Promise<void> => {
  await cleanBuild();
})();
