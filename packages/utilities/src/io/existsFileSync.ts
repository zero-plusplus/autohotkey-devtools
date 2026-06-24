import * as fs from 'node:fs';

/**
 * Synchronously checks whether a file exists in the specified path.
 * @param path
 * @returns
 */
export function existsFileSync(path: string): boolean {
  try {
    if (fs.statSync(path).isFile()) {
      return true;
    }
  }
  catch {
  }
  return false;
}
