import { ICommand } from '../models/typings/interfaces';
import { CommandContext } from '../CommandsCtx';

export class Shutdown implements ICommand {
    commandNames = ['shutdown'];
    async run({ message, args, command }: CommandContext) {
        if (message.author.id != "205401799149092864") message.channel.send("Este comando é proibido");

        try {
            await message.channel.send("Desligando o bot...");
            process.exit(2);
        }
        catch (e) {
            message.channel.send(`Erro: ${e.message}`);
        }
    }
    getHelpMessage(commandPrefix: string): string {
        return `Modo de utilização: ${commandPrefix}shutdown
            Desliga o bot.`;
    }
    hasPermissionToRun = (parsedUserCommand: CommandContext) => {
        if (parsedUserCommand.message.author.id != "205401799149092864")
            return true
    };

}

