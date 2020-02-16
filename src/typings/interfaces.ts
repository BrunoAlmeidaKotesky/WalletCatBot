import * as Discord from 'discord.js';
import EmbedCommand from 'commands/uinfo';

export interface IBotCommand {
  help(string:string);
  isCommand: (command: string)=> boolean;
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void;
}
export  interface IConstructorCommand {
 new (command: string): IBotCommand;
}