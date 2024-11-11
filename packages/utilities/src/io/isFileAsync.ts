import * as fs from 'fs/promises';

/**
 * Checks asynchronously if the specified path is a file.
 * @param path
 * @returns
 */
export async function isFileAsync(path: string): Promise<boolean> {
  try {
    if ((await fs.stat(path)).isFile()) {
      return true;
    }
  }
  catch {
  }
  return false;
}
