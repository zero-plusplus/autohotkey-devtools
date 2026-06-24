import * as rolldown from 'rolldown';

export async function watch(buildOptions: rolldown.BuildOptions, setup: () => Promise<void> | void = async() => Promise.resolve()): Promise<rolldown.RolldownWatcher> {
  return new Promise((resolve) => {
    resolve(rolldown.watch(buildOptions).on('event', async(event) => {
      switch (event.code) {
        case 'START': {
          console.log('[rolldown] Build was started.');
          await setup();
          return;
        }
        case 'BUNDLE_END': {
          console.log(`[rolldown] Bundle was completed (${event.duration}ms)`);
          event.result.close();
          return;
        }
        case 'ERROR': {
          console.error(event.error.message);
          return;
        }
        default: break;
      }
      console.log('[rolldown] Build was completed.');
    }));
  });
}
