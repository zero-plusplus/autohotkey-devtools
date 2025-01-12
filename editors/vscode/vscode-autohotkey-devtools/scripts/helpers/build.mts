import tmLanguages from '@zero-plusplus/autohotkey-tmlanguage/src';
import { ScopeName } from '@zero-plusplus/autohotkey-tmlanguage/src/types.js';
import autohotkeyl from '@zero-plusplus/autohotkey-tmlanguage/test/autohotkeyl/expected/index.js';
import * as esbuild from 'esbuild';
import * as fs from 'fs/promises';
import * as path from 'path';
import { buildDir, demoDir } from '../config.mjs';

export async function build(buildOptions: esbuild.BuildOptions): Promise<void> {
  await fs.mkdir(buildDir, { recursive: true });
  await Promise.all([
    buildTmLanguageAll(),
    buildLanguageConfigurationAll(),
    esbuild.build(buildOptions),
  ]);
}
export async function buildTmLanguageAll(debugMode = false): Promise<void> {
  await Promise.all([
    buildTmLanguage('autohotkey', debugMode),
    buildTmLanguage('autohotkeynext', debugMode),
    buildTmLanguage('autohotkey2', debugMode),
    buildTmLanguage('autohotkeyl', debugMode),
    buildTmLanguage('markdown', debugMode),
  ]);
}
export async function buildTmLanguage(scopeName: ScopeName | 'markdown', debugMode = false): Promise<void> {
  const tmLanguage = tmLanguages[scopeName].createTmLanguage();
  const tmLanguagePath = path.resolve(buildDir, `${scopeName}.tmLanguage.json`);
  const tmLanguageText = JSON.stringify(tmLanguage, undefined, debugMode ? 1 : 0);
  await writeFile(tmLanguagePath, tmLanguageText);
}

export async function buildLanguageConfigurationAll(): Promise<void> {
  await Promise.all([
    buildLanguageConfiguration('autohotkey'),
    buildLanguageConfiguration('autohotkeynext'),
    buildLanguageConfiguration('autohotkey2'),
    buildLanguageConfiguration('autohotkeyl'),
  ]);
}
export async function buildLanguageConfiguration(scopeName: ScopeName): Promise<void> {
  const tmLanguageText = JSON.stringify(createLanguageConfiguration(scopeName), undefined, 2);
  const tmLanguagePath = path.resolve(buildDir, `${scopeName}.language-configuration.json`);

  await fs.mkdir(buildDir, { recursive: true });
  await fs.writeFile(tmLanguagePath, tmLanguageText, { encoding: 'utf-8' });
  return Promise.resolve();
}

// https://code.visualstudio.com/api/language-extensions/language-configuration-guide
export function createLanguageConfiguration(scopeName: ScopeName): Record<string, any> {
  const languageConfig: Record<string, any> = {
    comments: {
      blockComment: [
        '/*',
        '*/',
      ],
      lineComment: ';',
    },
    brackets: [
      [ '(', ')' ],
      [ '[', ']' ],
      [ '{', '}' ],
    ],
    autoClosingPairs: [
      { open: '(', close: ')' },
      { open: '[', close: ']' },
      { open: '{', close: '}' },
      { open: '"', close: '"', notIn: [ 'string' ] },
      { open: '/**', close: ' */', notIn: [ 'string', 'comment' ] },
      { open: '/*', close: ' */', notIn: [ 'string', 'comment' ] },
    ],
    autoCloseBefore: ':.,=}])> \n\t',
    surroundingPairs: [
      [ '(', ')' ],
      [ '[', ']' ],
      [ '{', '}' ],
      [ '"', '"' ],
      [ '\'', '\'' ],
      [ '%', '%' ],
      [ '<', '>' ],
    ],
    folding: {
      markers: {
        start: '^\\s*;\\s*(?i:#region)\\b',
        end: '^\\s*;\\s*(?i:#endregion)\\b',
      },
    },
    wordPattern: scopeName === 'autohotkeyl'
      ? '[a-Z$@#_\\w][a-Z$@#_0-9\\w]{0,252}'
      : '[a-Z_\\w][a-Z0-9\\w]{0,252}',
    indentationRules: {
      increaseIndentPattern: '[([{]\\s*$',
      decreaseIndentPattern: `^\\s*[)\\]}]\\s*$`,
    },
    onEnterRules: [
      {
        beforeText: '^\\s*/\\*\\s*$',
        action: {
          indent: 'indentOutdent',
        },
      },
      {
        beforeText: '^\\s*/\\*\\*\\s*$',
        action: {
          appendText: ' * ',
          indent: 'indentOutdent',
        },
      },
      {
        beforeText: '^\\s*\\*(?!/)\\s*((?i:@example)|```(?i:autohotkey|ahk))',
        action: {
          appendText: '*: ',
          indent: 'none',
        },
      },
      {
        beforeText: '^\\s*\\*:\\s*',
        action: {
          appendText: '*: ',
          indent: 'none',
        },
      },
      {
        beforeText: '^\\s*\\*(?!/)\\s*',
        action: {
          appendText: '* ',
          indent: 'none',
        },
      },
      {
        beforeText: '^\\s*\\*/$',
        action: {
          indent: 'outdent',
        },
      },
      {
        beforeText: '^\\s*$',
        action: {
          indent: 'none',
        },
      },
    ],
    colorizedBracketPairs: [
      [ '(', ')' ],
      [ '[', ']' ],
      [ '{', '}' ],
    ],
  };
  return languageConfig;
}

export async function buildDemo(): Promise<void> {
  await buildDemoForV1();
}
export async function buildDemoForV1(): Promise<void> {
  const scopeName: ScopeName = 'autohotkeyl';
  const demoPath = path.resolve(demoDir, `${scopeName}.ahkl`);
  const demoText = autohotkeyl.createExpectedDataList(scopeName).map((expectedData) => expectedData[0]).join('\n');
  await writeFile(demoPath, demoText);
}

// #region helpers
async function writeFile(filePath: string, text: string): Promise<void> {
  let isExists = false;
  try {
    const stat = await fs.stat(filePath);
    isExists = stat.isFile();
  }
  catch {
  }

  if (isExists) {
    const existsFileText = await fs.readFile(filePath, 'utf-8');
    if (existsFileText === text) {
      console.log(`Skip: "${filePath}".`);
      return;
    }
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, text, { encoding: 'utf-8' });

  console.log(`Overwrite: "${filePath}".`);
}
// #endregion helpers
