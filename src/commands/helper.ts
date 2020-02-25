import { ICommand } from "../typings/interfaces";
import { CommandContext } from "../CommandsCtx";

export class HelpCommand implements ICommand {
  readonly commandNames = ["help", "h"];
  private commands: ICommand[];
  
  constructor(commands: ICommand[]) {
    this.commands = commands;
  }

  async run(commandContext: CommandContext): Promise<void> {
    commandContext.message.delete(2000);
    const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));

    if (commandContext.args.length == 0) {
      const commandNames = allowedCommands.map(command => command.commandNames[0]);
      await commandContext.message.reply(`Informe o nome de um comando!`);
      return
    }

    const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.args[0]));
    if (!matchedCommand) {
      await commandContext.message.reply("Comando não entendido! Digite +help para obter uma lista de todos os comandos!");
      return Promise.reject("Comando não existe!");
    } else if (allowedCommands.includes(matchedCommand)) {
      await commandContext.message.reply(this.returnHelpMessageForCommands(matchedCommand, commandContext));
    }
  }

  private returnHelpMessageForCommands(command: ICommand, context: CommandContext): string {
    return `${command.getHelpMessage(context.commandPrefix)}\nAlias: ${command.commandNames.join(", ")}`
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return true;
  }

  getHelpMessage = (commandPrefix: string) => "Você já esta o utilizando❗";
}