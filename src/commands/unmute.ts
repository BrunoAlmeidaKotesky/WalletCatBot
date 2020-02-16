import fs from 'fs';
import * as Discord from 'discord.js';
import { Message } from 'discord.js';
import BaseClass from '../baseClass';

export default class Unmute extends BaseClass {
    constructor(){super("unban")};
    runCommand(args: string[], message: Message, client: Discord.Client){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Você não tem permissão para gerenciar mensagens.");
    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Você não mencionou o usuário ou ID.");
    let role = message.guild.roles.find(r => r.name === "TempMute");
    if(!role  || !toMute.roles.has(role.id)) return message.channel.send("Este usuário não está mutado");

    toMute.removeRole(role);
}
}
