const Discord = require("discord.js");
const fs = require("fs");
const botSettings = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {

    let code = "```";
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
        prefixes: botSettings.prefix};
    }
    let prefix = prefixes[message.guild.id].prefixes;
    console.log(prefix);
    if(!args[0] || args[0 == "help"]) return message.reply(`Exemplo: ${prefix}send <Seu texto>`);


    let remove =  message.content.replace(`${prefix}send`, `${message.author.username} disse:`)
   
    message.channel.send(`${code}${remove}${code}`);

}

module.exports.help = {
    name: "send"
  }