const botSettings = require("./botconfig.json");
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const prefix = botSettings.prefix;

bot.on("ready", async () => {
    console.log(`Bot pronto! ${bot.user.username}`);
    try{
         let link = await bot.generateInvite(["ADMINISTRATOR"]);
         console.log(link)
       }
       catch(e) {console.log(e.stack)};

});

bot.on("message", async message => {if(message.author.bot) return;
    if(message.channel.type ==="dm") return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}uinfo`){
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

});

bot.login(botSettings.token);

