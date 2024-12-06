import tmLanguages from '@zero-plusplus/autohotkey-tmlanguage/src';
import { ScopeName } from '@zero-plusplus/autohotkey-tmlanguage/src/types.js';
import * as esbuild from 'esbuild';
import * as fs from 'fs/promises';
import * as path from 'path';
import { buildDir } from '../config.mjs';

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
  ]);
}
export async function buildTmLanguage(scopeName: ScopeName, debugMode = false): Promise<void> {
  const tmLanguage = tmLanguages[scopeName].createTmLanguage();
  const tmLanguageText = JSON.stringify(tmLanguage, undefined, debugMode ? 1 : 0);
  const tmLanguagePath = path.resolve(buildDir, `${scopeName}.tmLanguage.json`);

  let isExists = false;
  try {
    const stat = await fs.stat(tmLanguagePath);
    isExists = stat.isFile();
  }
  catch {
  }

  if (isExists) {
    const existsTmLanguageText = await fs.readFile(tmLanguagePath, 'utf-8');
    if (existsTmLanguageText === tmLanguageText) {
      console.log(`Skip: "${tmLanguagePath}".`);
      return;
    }
  }

  await fs.mkdir(buildDir, { recursive: true });
  await fs.writeFile(tmLanguagePath, tmLanguageText, { encoding: 'utf-8' });

  console.log(`Overwrite: "${tmLanguagePath}".`);
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
        start: '^\\s*;\\s*(\\{|#region\\b)',
        end: '^\\s*;\\s*(\\}|#endregion\\b)',
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
        beforeText: '^\\s*\\*\\s*$',
        action: {
          appendText: '* ',
          indent: 'none',
        },
      },
      {
        beforeText: '^\\s*\\*/*$',
        action: {
          indent: 'outdent',
        },
      },
      {
        beforeText: '^\\s*;\\{\\s*$',
        action: {
          appendText: ';',
          indent: 'none',
        },
      },
      {
        beforeText: '^\\s*;#region\\s*$',
        action: {
          appendText: ';#endregion',
          indent: 'indentOutdent',
        },
      },
      {
        beforeText: '^\\s*; #region\\s*$',
        action: {
          appendText: '; #endregion',
          indent: 'indentOutdent',
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
