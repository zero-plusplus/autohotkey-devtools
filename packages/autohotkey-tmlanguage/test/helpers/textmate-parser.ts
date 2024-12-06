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
    'source.autohotkey': grammars.autohotkey.createTmLanguage(),
    'source.autohotkeynext': grammars.autohotkeynext.createTmLanguage(),
    'source.autohotkey2': grammars.autohotkey2.createTmLanguage(),
    'source.autohotkeyl': grammars.autohotkeyl.createTmLanguage(),
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

  const parsed: ParsedResult[] = [];

  const linebreakRegExp = /(\r\n|\n)/;
  const lines = text.split(linebreakRegExp).filter((line) => line !== '');
  // Convert 'line1\r\nline2\nline3' to [ 'line\r\n', 'line2\n', 'line3' ]
  // .reduce<string[]>((prev, current, i) => {
  //   if (0 < i && (linebreakRegExp).test(current)) {
  //     const prevLine = prev[prev.length - 1];
  //     if (prevLine && !linebreakRegExp.test(prevLine)) {
  //       prev[prev.length - 1] = `${prev[prev.length - 1]}${current}`;
  //       return prev;
  //     }
  //   }
  //   prev.push(current);
  //   return prev;
  // }, []);

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
