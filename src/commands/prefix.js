const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  
  if(!message.member.hasPermission("ADMINISTRATOR"))  return message.reply("Você não tem permissão.");

  if(!args[0] || args[0 == "help"]) return message.reply(`Exemplo: <Prefixo Atual> <Novo prefixo>`);

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Prefixo alterado!")
  .setDescription(`Alterado para: ${args[0]}`);

  message.channel.sendEmbed(sEmbed);
  message.author.send(`O seu novo prefixo é: ${args[0]}, lembre-se que o padrão é: +`)
}

module.exports.help = {
  name: "prefix",
  aliases: [],
  noaliases: "no aliases",
  accessableby: "Administrators",
  description: "Altera o prefixo padrão do bot para um novo."

}