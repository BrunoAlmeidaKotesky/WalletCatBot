const botSettings = require("./botconfig.json");
const token = require("./token.json");
const Discord = require('discord.js');
const antispam = require('discord-anti-spam');
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

       antispam(bot, {
        warnBuffer: 7, // Maximum ammount of messages allowed to send in the interval time before getting warned.
        maxBuffer: 9, // Maximum amount of messages allowed to send in the interval time before getting banned.
        interval: 2500, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
        warningMessage: "Para de Spammar!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
        banMessage: "Foi banido por spammar!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
        maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
        maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
        deleteMessagesAfterBanForPastDays: 1, // Deletes the message history of the banned user in x days.
        exemptRoles: ["Moderator"], // Name of roles (case sensitive) that are exempt from spam filter.
        exemptUsers: [] // The Discord tags of the users (e.g: MrAugu#9016) (case sensitive) that are exempt from spam filter.
      });
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type ==="dm") return;
    bot.emit('checkMessage', message); // This runs the filter on any message bot receives in any guilds.

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

