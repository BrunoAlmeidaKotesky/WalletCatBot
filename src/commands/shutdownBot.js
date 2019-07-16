require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async(bot, message, args) =>{

    if(message.author.id != "205401799149092864") return message.channel.send("Este comando é proibido");

    try{
        await message.channel.send("Desligando o bot...");
        bot.destroy();
        process.exit();
    }
    catch(e){
        message.channel.send(`Erro: ${e.message}`);
    }
}

module.exports.help = {
    name: "shutdown",
    aliases: ["botoff"]
}