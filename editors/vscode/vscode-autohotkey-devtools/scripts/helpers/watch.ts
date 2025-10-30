import * as esbuild from 'esbuild';

export async function watch(buildOptions: esbuild.BuildOptions, callback?: () => void | Promise<void>): Promise<void> {
  const watcherPlugin: esbuild.Plugin = {
    name: 'watcher',
    setup: (build) => {
      build.onStart(() => {
        callback?.();
        console.log('[esbuild] Build was started.');
      });
      build.onEnd((result) => {
        if (result.errors.length === 0 && result.warnings.length === 0) {
          console.log('[esbuild] Build was completed without problems.');
          return;
        }

        if (0 < result.errors.length) {
          console.log('Errors:');
          console.log(result.errors.map((message) => `  ${messageToString(message)}`).join('\n'));
        }
        if (0 < result.warnings.length) {
          console.log('Warnings:');
          console.log(result.warnings.map((message) => `  ${messageToString(message)}`).join('\n'));
        }
        console.log('[esbuild] Build was completed.');
      });
    },
  };

  const context = await esbuild.context({ ...buildOptions, plugins: [ watcherPlugin ] });
  context.watch();
}

// #region helpers
function messageToString(message: esbuild.Message): string {
  return `${message.pluginName}: ${message.detail}`;
}
// #endregion helpers
