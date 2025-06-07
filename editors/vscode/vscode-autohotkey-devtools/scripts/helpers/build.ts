import * as tmLanguages from '@zero-plusplus/autohotkey-tmlanguage/src';
import type { ScopeName } from '@zero-plusplus/autohotkey-tmlanguage/src/tmlanguage';
import * as autohotkey from '@zero-plusplus/autohotkey-tmlanguage/test/autohotkey/expected';
import * as autohotkey2 from '@zero-plusplus/autohotkey-tmlanguage/test/autohotkey2/expected';
import * as autohotkeyl from '@zero-plusplus/autohotkey-tmlanguage/test/autohotkeyl/expected';
import * as autohotkeynext from '@zero-plusplus/autohotkey-tmlanguage/test/autohotkeynext/expected';
import type { ExpectedTestData } from '@zero-plusplus/autohotkey-tmlanguage/test/types';
import * as esbuild from 'esbuild';
import * as fs from 'fs/promises';
import * as path from 'path';
import { buildDir, demoDir } from '../config';

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
      { open: '\'', close: '\'', notIn: [ 'string' ] },
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
      // 4 indentations in the document
      // /**
      //  * @typedef {
      //  *     xxx: yyy
      //  *     XXX: YYY
      //    ^^^^
      //  * }
      //  */
      {
        beforeText: '^\\s*\\*(?!/)\\s{5}',
        action: {
          appendText: '*     ',
          indent: 'none',
        },
      },
      // 2 indentations in the document
      // /**
      //  * @typedef {
      //  *   xxx: yyy
      //  *   XXX: YYY
      //    ^^
      //  * }
      //  */
      {
        beforeText: '^\\s*\\*(?!/)\\s{3}',
        action: {
          appendText: '*   ',
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

export async function buildDemoAll(): Promise<void> {
  await buildDemoForDefault();
  await buildDemoForNext();
  await buildDemoForV2();
  await buildDemoForV1();
}
export async function buildDemoForDefault(): Promise<void> {
  await buildDemo('autohotkey', 'ahk', autohotkey.createExpectedDataList);
}
export async function buildDemoForNext(): Promise<void> {
  await buildDemo('autohotkeynext', 'ahknext', autohotkeynext.createExpectedDataList);
}
export async function buildDemoForV2(): Promise<void> {
  await buildDemo('autohotkey2', 'ahk2', autohotkey2.createExpectedDataList);
}
export async function buildDemoForV1(): Promise<void> {
  await buildDemo('autohotkeyl', 'ahkl', autohotkeyl.createExpectedDataList);
}

// #region helpers
async function buildDemo(scopeName: ScopeName, extension: string, expectedDataBuilder: (scopeName: ScopeName) => ExpectedTestData[]): Promise<void> {
  const demoPath = path.resolve(demoDir, `${scopeName}.${extension}`);
  const demoText = expectedDataBuilder(scopeName).map((expectedData) => expectedData[0]).join('\n');
  await writeFile(demoPath, demoText);
}
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
