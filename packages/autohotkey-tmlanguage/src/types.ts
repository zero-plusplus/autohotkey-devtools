import {
  CommandParameterFlag, CommandSignatureFlag, HighlightType,
  type CommandFlag,
} from './definitions';

export interface CommandParameter {
  readonly type: HighlightType;
  readonly flags: CommandParameterFlag;
  readonly itemPatterns?: string[];
}
export interface SubCommandParameter extends CommandParameter {
  readonly type: HighlightType.SubCommand | HighlightType.SubCommandLike | HighlightType.FlowSubCommand | HighlightType.GuiSubCommand;
  readonly itemPatterns: string[];
}
export interface CommandSignature {
  readonly flags: CommandSignatureFlag;
  readonly parameters: CommandParameter[];
}
export interface CommandDefinition {
  readonly name: string;
  readonly flags: CommandFlag;
  readonly signatures: CommandSignature[];
}
