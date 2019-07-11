
const Discord = require("discord.js");
module.exports.run = async(bot, message, args) => {


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
module.exports.help = {
    name:"uinfo"
  }