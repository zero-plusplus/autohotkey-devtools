import * as fs from 'fs/promises';

/**
 * Asynchronously checks whether a file exists in the specified path.
 * @param path
 * @returns
 */
export async function existsFileAsync(path: string): Promise<boolean> {
  try {
    if ((await fs.stat(path)).isFile()) {
      return true;
    }
  }
  catch {
  }
  return false;
}
