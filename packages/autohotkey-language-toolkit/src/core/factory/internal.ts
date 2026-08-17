import type {
  RawToken,
  SyntaxElement,
} from '../../types';

export function makeSyntaxElement(kind: string, flags: number = 0, children?: SyntaxElement[], text?: string, leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxElement {
  return {
    kind,
    flags,
    leadingTrivia,
    trailingTrivia,
    children,
    text,
  } as SyntaxElement;
}
