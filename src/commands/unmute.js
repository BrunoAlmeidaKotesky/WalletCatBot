const fs = require('fs');
require('discord.js');

module.exports.run = async (bot,message, args) =>{

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Você não tem permissão para gerenciar mensagens.");
    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Você não mencionou o usuário ou ID.");
    let role = message.guild.roles.find(r => r.name === "TempMute");
    if(!role  || !toMute.roles.has(role.id)) return message.channel.send("Este usuário não está mutado");

    await toMute.removeRole(role);

    delete bot.mutes[toMute.id];

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if(err) throw err;
       console.log(message.channel.send(`Desmutado ${toMute.user.tag}.`));
    });

}

module.exports.help = {
    name:"unmute",
    noaliases: "No aliases",
    aliases: [],
    description: "Cancela um mute de um usuário",
    accessableby: "Moderadores",
}