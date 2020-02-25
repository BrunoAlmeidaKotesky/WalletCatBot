import { config, BotConfig } from './config';
import { Message, Client } from "discord.js";
import { CommandHandler } from "./CommandHandler";


validateConfig(config);

const commandHandler = new CommandHandler(config.prefix);
const client = new Client();

client.on("ready", () => console.log('Bot ligado!'));
client.on("error", e => console.error("Discord error: ", e));
client.on("message", (message: Message) => commandHandler.handleMessage(message));
client.login(config.token);

function validateConfig(config: BotConfig) {
  if (!config.token) throw new Error("Token não especificado!");
}