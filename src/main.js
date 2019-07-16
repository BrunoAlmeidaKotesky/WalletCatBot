const botSettings = require("./botconfig.json");
const token = require("./token.json");
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});

//const prefix = botSettings.prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(aliases =>{
      bot.aliases.set(aliases, props.help.name);
    });

    
  });
});

fs.readdir("./commands/markdown/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands in markdown.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/markdown/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(aliases =>{
      bot.aliases.set(aliases, props.help.name);
    });
  });
});

bot.on("ready", async () => {
    console.log(`Bot pronto! ${bot.user.username}`);
    try{
         let link = await bot.generateInvite(["ADMINISTRATOR"]);
         console.log(link)
       }
       catch(e) {console.log(e.stack)};
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type ==="dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
        prefixes: botSettings.prefix};
    }
    let prefix = prefixes[message.guild.id].prefixes;
  
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if(cmd) cmd.run(bot, message, args);

    
});

bot.login(token.token);

