import { config } from './config';
require('dotenv').config()
import { Message, Client } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { applyMessages } from './commands/dailyMessages';
import { registerNewServer, connectToDatabase } from './database/databaseController';

const commandHandler = new CommandHandler(config.prefix);
const client = new Client();

const handleEvents = () => {
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
  });
}

client.login(process.env.TOKEN);
handleEvents();