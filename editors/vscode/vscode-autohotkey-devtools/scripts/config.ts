import { globSync } from 'node:fs';
import * as path from 'node:path';
import * as rolldown from 'rolldown';

export const packageDir: string = path.resolve(import.meta.dirname, '..');
export const projectRootDir: string = path.resolve(packageDir, '../../../');
export const buildDir: string = path.resolve(packageDir, 'build');
export const demoDir: string = path.resolve(buildDir, 'demo');
export const buildSourceDir: string = path.resolve(buildDir, 'src');
export const srcDir: string = path.resolve(packageDir, 'src');
export const browserSrcDir: string = path.resolve(srcDir, 'browser');

export const debugBuildOptions: rolldown.BuildOptions = {
  platform: 'node',
  input: globSync(path.resolve(srcDir, '**/*.ts')),
  output: {
    dir: 'build/src/',
    entryFileNames: '[name].js',
    format: 'cjs',
    preserveModules: true,

    sourcemap: true,
  },
  external: [ 'vscode' ],
};
export const buildOptions: rolldown.BuildOptions = {
  platform: 'node',
  input: [ srcDir, browserSrcDir ].map((dir) => path.resolve(dir, 'extension.js')),
  output: {
    dir: 'build/src/',
    entryFileNames: '[name].js',
    format: 'cjs',
    preserveModules: true,
  },
  external: [ 'vscode' ],
};
