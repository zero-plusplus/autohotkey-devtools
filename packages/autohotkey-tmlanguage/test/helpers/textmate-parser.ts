import { singleton } from '@zero-plusplus/utilities/src';
import * as fs from 'fs';
import * as path from 'path';
import * as oniguruma from 'vscode-oniguruma';
import * as vsctm from 'vscode-textmate';
import * as grammars from '../../src';
import type { ScopeName, TmLanguage } from '../../src/types';
import type { ParsedResult } from '../types';

const rootDirectory = path.resolve(__dirname, '../../../../');
const nodeModulesDirectory = path.resolve(rootDirectory, 'node_modules');
const onigurumaWasmPath = path.resolve(nodeModulesDirectory, 'vscode-oniguruma', 'release', 'onig.wasm');

const createTextMateRegistry = singleton(async(): Promise<vsctm.Registry> => {
  const wasmBinary = fs.readFileSync(onigurumaWasmPath);
  await oniguruma.loadWASM(wasmBinary as unknown as oniguruma.IOptions);

  const grammarsByScopeName: Record<`source.${ScopeName}`, TmLanguage> = {
    'source.autohotkey': createTmLanguage(grammars.autohotkey.createTmLanguage),
    'source.autohotkeynext': createTmLanguage(grammars.autohotkeynext.createTmLanguage),
    'source.autohotkey2': createTmLanguage(grammars.autohotkey2.createTmLanguage),
    'source.autohotkeyl': createTmLanguage(grammars.autohotkeyl.createTmLanguage),
  };

  return new vsctm.Registry({
    onigLib: new Promise((resolve): void => {
      resolve({
        createOnigScanner(sources): oniguruma.OnigScanner {
          return oniguruma.createOnigScanner(sources);
        },
        createOnigString(str): oniguruma.OnigString {
          return oniguruma.createOnigString(str);
        },
      });
    }),
    loadGrammar: async(scopeName: `source.${ScopeName}`): Promise<vsctm.IRawGrammar> => {
      return new Promise((resolve) => {
        if (scopeName in grammarsByScopeName) {
          resolve(grammarsByScopeName[scopeName] as vsctm.IRawGrammar);
          return;
        }
        throw Error(`Failed to load Scope "${scopeName}"`);
      });
    },
  });
});

export async function parse(scopeName: ScopeName, text: string): Promise<ParsedResult[]> {
  const registry = await createTextMateRegistry();
  const grammar = await registry.loadGrammar(`source.${scopeName}`);
  if (!grammar) {
    throw Error(`Scope "source.${scopeName}" is not defined.`);
  }
  const linebreakRegExp = /(\r\n|\n)/;
  const lines = text.split(linebreakRegExp).filter((line) => line !== '');

  const parsed: ParsedResult[] = [];
  let ruleStack = vsctm.INITIAL;
  for (const line of lines) {
    const match = line.match(/\r\n|\n/);
    if (match) {
      continue;
    }

    const tokenized = grammar.tokenizeLine(line, ruleStack);
    parsed.push(...tokenized.tokens
      .flatMap((token) => {
        const text = line.slice(token.startIndex, token.endIndex);
        const scopes = token.scopes.filter((scope) => scope !== `source.${scopeName}`).join(' '); // remove scope name. e.g. `source.autohotkey`

        if ((/^\s*$/).test(text)) {
          return [];
        }
        return [ { text, scopes } ];
      }));

    ruleStack = tokenized.ruleStack;
  }

  return parsed;
}

function createTmLanguage(builder: () => TmLanguage): TmLanguage {
  return JSON.parse(JSON.stringify(builder(), undefined, 1)
    // markdown is not included in the test
    .replaceAll(/"text.html.markdown(#.*)?"/gu, '""')) as TmLanguage;
}
