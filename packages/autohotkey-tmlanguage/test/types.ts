export interface ParsedResult {
  text: string;
  scopes?: string;
}
export type ExpectedTestData = [ string, ParsedResult[] ];
