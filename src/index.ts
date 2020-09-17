import { config, BotConfig } from './config';
import { Message, Client, TextChannel, MessageAttachment, Attachment } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import {job} from 'cron';

function validateConfig(config: BotConfig) {
  if (!config.token) throw new Error("Token não especificado!");
}

validateConfig(config);

const commandHandler = new CommandHandler(config.prefix);
const client = new Client();

client.on("ready", () => { 
  console.log('Bot ligado!')
  const repate = job({
    timeZone: 'America/Sao_Paulo',
    cronTime: '0 0 11 * * 5',
    onTick: () => {
      const channel = client.channels.find(p => p.id === '203949437331046400');
      if(channel.type === 'text')
        (channel as TextChannel).send('Hoje é sexta galero!', {files: ['https://imgur.com/C5bmKpF.jpg']})
    }
  });
  repate.start();
});
client.on("error", e => console.error("Discord error: ", e));
client.on("message", (message: Message) => { 
  commandHandler.handleMessage(message)
  if(message.channel.id === '647661888854949899'){
     let musicChannel = client.channels.find(c => c.id === '720042446003634207');
     if(musicChannel){
      let randomGif = Math.floor(Math.random() * 10) + 1;
      let attachment = new Attachment(`src\\resources\\guitar${randomGif}.gif`);
      (musicChannel as TextChannel).send(attachment);
     }
  }
});
client.login(config.token);
