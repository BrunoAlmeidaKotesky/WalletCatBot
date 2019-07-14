const fs = module.require("fs");
const Discord = module.require("discord.js");
const ms = require('ms');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("Você não tem permissão para gerenciar mensagens.");}

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Você não mencionou o usuário ou ID.");

    if(toMute.id === message.author.id) return message.channel.send('Você não pode mutar a si mesmo.');
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("Você não pode mutar alguem com cargo superior ou igual ao seu.");

    let muterole = message.guild.roles.find(r => r.name === "TempMute");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "TempMute",
                color: "#fff",
                permissions: []

            });

            message.guild.channels.forEach(async (channel, id) => {

                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES:false,
                    ADD_REACTIONS: false
                });
                
            });
        }
        catch(e){
            console.log(e.stack);
        }
    }
    
    let muteTime = args[2];
    if(!muteTime) return message.reply("Você não especificou um tempo");

    await(toMute.addRole(muterole.id));
    message.reply(`<@${toMute.id}> foi mutado por ${ms(ms(muteTime))}`);

    setTimeout(function(){
            toMute.removeRole(muterole.id);
            message.channel.send(`<@${toMute.id}> foi desmutado.`)
    }, ms(muteTime));


    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
        if(err) throw err;
    });


}

module.exports.help= {
    name: "mute"
}