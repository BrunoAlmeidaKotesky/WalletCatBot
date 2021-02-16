import * as Discord from 'discord.js';
import { CommandContext } from '../../CommandsCtx';

export interface ICommand {
  readonly commandNames: string[];
  run(parsedUserCommand: CommandContext): Promise<void>;
  getHelpMessage(commandPrefix: string): string;
  hasPermissionToRun(parsedUserCommand: CommandContext): boolean;
}