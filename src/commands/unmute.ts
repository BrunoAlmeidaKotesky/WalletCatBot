import { CommandContext } from './../CommandsCtx';
import { ICommand } from './../typings/interfaces';

export class Unmute implements ICommand {
    public commandNames = ["unban"];

    async run({ args, message, command }: CommandContext): Promise<void> {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) message.channel.send("Você não tem permissão para gerenciar mensagens.");
        let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!toMute) message.channel.send("Você não mencionou o usuário ou ID.");
        let role = message.guild.roles.find(r => r.name === "TempMute");
        if (!role || !toMute.roles.has(role.id)) message.channel.send("Este usuário não está mutado");

        toMute.removeRole(role);
    }

    getHelpMessage(commandPrefix: string): string {
          return `Modo de utilização: ${commandPrefix}unban
                  Desbane um usuário.`;
        }
      
    hasPermissionToRun=(parsedUserCommand: CommandContext)=> true;

}
