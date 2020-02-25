import { CommandContext } from './../CommandsCtx';
import { ICommand } from './../typings/interfaces';
import * as Discord from 'discord.js';

export class EmbedCommand implements ICommand{
        public commandNames = ["uinfo", "myinfo"];

        getHelpMessage(commandPrefix: string): string {
          return `Modo de utilização: ${commandPrefix}uinfo
                  Traz alguns detalhes da sobre a sua conta.`;
        }
      
        hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
          return true;
        }
        async run({message, args, command}: CommandContext): Promise<void> {
                let container = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription("**Informações sobre o usuário.**")
                .setColor("#fff")
                .addField("Nome de usuário: ", `${message.author.username}#${message.author.discriminator}`)
                .addField("ID: ", `${message.author.id}`)
                .addField("Criado em: ", `${message.author.createdAt}`)
                .setImage(message.author.avatarURL);
        
                message.channel.sendEmbed(container);
                return;
        }
}

  