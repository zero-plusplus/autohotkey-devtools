import * as fs from 'fs';

/**
 * Checks synchronously if the specified path is a file.
 * @param path
 * @returns
 */
export function isFileSync(path: string): boolean {
  try {
    if (fs.statSync(path).isFile()) {
      return true;
    }
  }
  catch {
  }
  return false;
}
