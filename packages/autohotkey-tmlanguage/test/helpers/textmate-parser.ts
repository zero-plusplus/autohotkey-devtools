import * as path from 'path';
import * as fs from 'fs';
import * as vsctm from 'vscode-textmate';
import * as oniguruma from 'vscode-oniguruma';
import { TmLanguage, ScopeName } from '../../src/types';
import * as grammars from '../../src';

const rootDirectory = path.resolve(__dirname, '../../../../');
const nodeModulesDirectory = path.resolve(rootDirectory, 'node_modules');
const onigurumaWasmPath = path.resolve(nodeModulesDirectory, 'vscode-oniguruma', 'release', 'onig.wasm');

let registry: vsctm.Registry | undefined;
async function createTextMateRegistry(): Promise<vsctm.Registry> {
  if (registry) {
    return registry;
  }

  const wasmBinary = fs.readFileSync(onigurumaWasmPath).buffer;
  await oniguruma.loadWASM(wasmBinary);

  const grammarsByScopeName: Record<`source.${ScopeName}`, TmLanguage> = {
    'source.autohotkey': grammars.autohotkey.createTmLanguage(),
    'source.autohotkeynext': grammars.autohotkeynext.createTmLanguage(),
    'source.autohotkey2': grammars.autohotkey2.createTmLanguage(),
    'source.autohotkeyl': grammars.autohotkeyl.createTmLanguage(),
  };

  registry = new vsctm.Registry({
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
  return registry;
}

export type ParsedResults = Array<{ text: string; scopes: string[] }>;
export async function parse(scopeName: ScopeName, text: string): Promise<ParsedResults> {
  const registry = await createTextMateRegistry();
  const grammar = await registry.loadGrammar(`source.${scopeName}`);
  if (!grammar) {
    throw Error(`Scope "source.${scopeName}" is not defined.`);
  }

  const parsed: ParsedResults = [];

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
    const tokenized = grammar.tokenizeLine(line, ruleStack);
    parsed.push(...tokenized.tokens
      .map((token) => {
        return {
          text: line.slice(token.startIndex, token.endIndex),
          scopes: token.scopes.filter((scope) => scope !== `source.${scopeName}`), // remove scope name. e.g. `source.autohotkey`
        };
      }));

    ruleStack = tokenized.ruleStack;
  }

  return parsed;
}
