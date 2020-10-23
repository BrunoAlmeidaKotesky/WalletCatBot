import { config } from './config';
require('dotenv').config()
import { Message, Client, TextChannel, MessageAttachment, Attachment, Guild } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { applyMessages } from './commands/dailyMessages';
import {join} from 'path';
import { registerNewServer, connectToDatabase } from './database/databaseController';

function monkeyMessage(message: Message){
  if(message.channel.id === '647661888854949899'){
    let musicChannel = client.channels.find(c => c.id === '720042446003634207');
    if(musicChannel){
     let randomGif = Math.floor(Math.random() * 10) + 1;
     const gifPath = join(__dirname, 'resources', `guitar${randomGif}.gif`);
     let attachment = new Attachment(gifPath);
     (musicChannel as TextChannel).send(attachment);
    }
 }
}

const commandHandler = new CommandHandler(config.prefix);
const client = new Client();

client.on("ready", async () => {
  await connectToDatabase();
  await client.user.setActivity(`Atualmente ativo em ${client.guilds.size} serveridores`, {type: 'PLAYING'});
  console.log('Bot ligado!');
  applyMessages(client);

});

client.on("guildCreate", async (guild) => await registerNewServer(guild));

client.on("error", e => console.error("Discord error: ", e));

client.on("message", (message: Message) => { 
  commandHandler.handleMessage(message);
  monkeyMessage(message);
});

client.login(process.env.TOKEN);