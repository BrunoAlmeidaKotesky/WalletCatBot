const Discord = require('discord.js');
const botConfig = require('../../botconfig.json');

const fs = require("fs");

    


module.exports.run = async(bot, message, args) =>{

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
        prefixes: botConfig.prefix};
    }
    let prefix = prefixes[message.guild.id].prefixes;
    console.log(prefix);

    
        if(args[0] == "help") return message.channel.send(`Exemplo: ${prefix}help`);

        if(args[0]) {
            let cmd = args[0];
            if(bot.commands.has(cmd)){
                
                cmd = bot.commands.get(cmd);
                let sEmbed = new Discord.RichEmbed()
                .setColor("#00FFFF")
                .setAuthor("WalletCat Helper", message.guild.iconURL)
                .setThumbnail(bot.user.displayAvatarURL)
                .setFooter("WalletCat v.1.0.3", bot.user.displayAvatarURL)
                .setDescription(`O prefixo atual é: ${prefix}\n\n
                    **Comando**: ${cmd.help.name}\n
                    **Descrição**: ${cmd.help.description}\n
                    **Disponível para**: ${cmd.help.accessableby || "Membros"}\n
                    **Alliases**: ${cmd.help.noaliases || cmd.help.aliases}`)
                    message.channel.sendEmbed(sEmbed);

            }
        }

        if(!args[0]){
            message.delete();
            let embed = new Discord.RichEmbed()
            .setAuthor("WalletCat Helper", message.guild.iconURL)
            .setColor("#00FFFF")
            .setDescription(`${message.author.username} enviado para suas mensagens privadas.`)

            let sEmbed2 = new Discord.RichEmbed()
            .setColor("#00FFFF")
            .setAuthor("WalletCat Helper", message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`O prefixo padrão é: ${prefix}`)
            .addField(`Comandos: `,"``prefix`` ``help`` ``mute`` ``unmute`` ``spoiler`` ``send`` ``uinfo``")
            .setFooter("WalletCat v.1.0.3", bot.user.displayAvatarURL);
            message.channel.sendEmbed(sEmbed2).then(m => m.delete(100000));
            message.author.sendEmbed(sEmbed2);

            
        }
}

module.exports.help = {
        name:"help",
        aliases:["h"],
        description: "",
        noaliases: "No aliases",
        accessableby: "Members"
}