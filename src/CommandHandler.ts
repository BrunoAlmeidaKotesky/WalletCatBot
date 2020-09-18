import { Message } from "discord.js";
import { ICommand } from "./typings/interfaces";
import { CommandContext } from "./CommandsCtx";
import { reactor } from "./commands/reactor";
import { HelpCommand } from "./commands/helper";
import {EmbedCommand , Shutdown, Sexta, GifMaker} from './commands/index';

export class CommandHandler {
  private commands: ICommand[];
  private readonly prefix: string;

  constructor(prefix: string) {
    const commandClasses = [ EmbedCommand, Sexta, Shutdown, GifMaker];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.commands.push(new HelpCommand(this.commands));
    this.prefix = prefix;
  }

  async handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !this.isCommand(message)) return undefined;
    const commandContext = new CommandContext(message, this.prefix);

    const matchedCommands = this.commands.find(command => command.commandNames.includes(commandContext.command));

    if (!matchedCommands) {
      await message.reply(`Comando desconhecido. Tente utilizar ${this.prefix}help`);
      await reactor.failure(message);
    } 
    else {
      try {
        await matchedCommands.run(commandContext);
        reactor.success(message);
      }
      catch(r) {
        console.log(r);
        reactor.failure(message);
      }
    }
  }

  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}