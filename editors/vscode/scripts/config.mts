import * as path from 'path';
import { globSync } from 'fs';
import * as esbuild from 'esbuild';

export const packageDir: string = path.resolve(import.meta.dirname, '..');
export const projectRootDir: string = path.resolve(packageDir, '../../');
export const buildDir: string = path.resolve(packageDir, 'build');
export const srcDir: string = path.resolve(packageDir, 'src');
export const browserSrcDir: string = path.resolve(srcDir, 'browser');

export const debugBuildOptions: esbuild.BuildOptions = {
  platform: 'node',
  format: 'cjs',
  entryPoints: globSync(path.resolve(srcDir, '**/*.ts')),
  outdir: 'build/src',
  sourcemap: true,
};
export const buildOptions: esbuild.BuildOptions = {
  ...debugBuildOptions,
  entryPoints: [ srcDir, browserSrcDir ].map((dir) => path.resolve(dir, 'extension.js')),
  bundle: true,
  minify: true,
  treeShaking: true,
  external: [ 'vscode' ],
  sourcemap: false,
};
