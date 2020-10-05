import { config, BotConfig } from './config';
require('dotenv').config()
import { Message, Client, TextChannel, MessageAttachment, Attachment } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { applyMessages } from './commands/dailyMessages';
import {join} from 'path';


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

console.log(process.env.TOKEN)

const commandHandler = new CommandHandler(config.prefix);
const client = new Client();

client.on("ready", () => { 
  console.log('Bot ligado!')
  applyMessages(client);

});

client.on("error", e => console.error("Discord error: ", e));

client.on("message", (message: Message) => { 
  commandHandler.handleMessage(message);
  monkeyMessage(message);
});

client.login(process.env.TOKEN);