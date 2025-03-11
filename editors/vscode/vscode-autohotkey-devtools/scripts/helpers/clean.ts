import * as fs from 'fs/promises';
import { buildDir, buildSourceDir } from '../config';

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
export async function cleanBuildSource(): Promise<void> {
  try {
    const stat = await fs.stat(buildSourceDir);
    if (!stat.isDirectory()) {
      return;
    }
    await fs.rm(buildSourceDir, { recursive: true });
  }
  catch {
  }
}
