import * as path from 'path';

export const runtimePath: string = path.resolve(process.env['ProgramFiles']!, 'AutoHotkey', 'v2.1-alpha', 'AutoHotkey64.exe');
export const projectDir: string = path.resolve(__dirname, '..');
export const sourceDir: string = path.resolve(projectDir, 'src');
