import * as Discord from 'discord.js';
import { Message } from 'discord.js';
import BaseClass from '../baseClass';

export default class EmbedCommand extends BaseClass {

        constructor(){ super("uinfo");}
        runCommand(args: string[], message: Message, client: Discord.Client): void {
                let container = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription("Informações sobre o usuário.")
                .setColor("#fff")
                .addField("Nome de usuário: ", `${message.author.username}#${message.author.discriminator}`)
                .addField("ID: ", `${message.author.id}`)
                .addField("Criado em: ", `${message.author.createdAt}`)
                .setImage(message.author.avatarURL);
        
                message.channel.sendEmbed(container);
                return;
        }
}

  