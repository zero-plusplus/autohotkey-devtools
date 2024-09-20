import * as fs from 'fs/promises';
import { buildDir } from '../config.mjs';

export async function cleanBuild(): Promise<void> {
  try {
    const stat = await fs.stat(buildDir);
    if (!stat.isDirectory()) {
      return;
    }
    await fs.rm(buildDir, { recursive: true });
  }
  catch {
  }
}
