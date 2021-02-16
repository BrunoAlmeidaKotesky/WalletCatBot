import { Message } from "discord.js";
import { ICommand } from "./models/typings/interfaces";
import { CommandContext } from "./CommandsCtx";
import { HelpCommand } from "./commands/helper";
import {EmbedCommand , Shutdown, Sexta, GifMaker, MemeGenerator, ImagesMessages, SelectImage} from './commands/index';

export class CommandHandler {
  private commands: ICommand[];
  private readonly prefix: string;

  constructor(prefix: string) {
    const commandClasses = [ EmbedCommand, Sexta, Shutdown, GifMaker, MemeGenerator, ImagesMessages, SelectImage];

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
    } 
    else {
      try {
        await matchedCommands.run(commandContext);
      }
      catch(r) {
        console.log(r);
      }
    }
  }

  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}