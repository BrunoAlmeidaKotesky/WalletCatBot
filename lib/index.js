"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./CommandHandler");
const dailyMessages_1 = require("./commands/dailyMessages");
const path_1 = require("path");
function monkeyMessage(message) {
    if (message.channel.id === '647661888854949899') {
        let musicChannel = client.channels.find(c => c.id === '720042446003634207');
        if (musicChannel) {
            let randomGif = Math.floor(Math.random() * 10) + 1;
            const gifPath = path_1.join(__dirname, 'resources', `guitar${randomGif}.gif`);
            let attachment = new discord_js_1.Attachment(gifPath);
            musicChannel.send(attachment);
        }
    }
}
console.log(process.env.TOKEN);
const commandHandler = new CommandHandler_1.CommandHandler(config_1.config.prefix);
const client = new discord_js_1.Client();
client.on("ready", () => {
    console.log('Bot ligado!');
    dailyMessages_1.applyMessages(client);
});
client.on("error", e => console.error("Discord error: ", e));
client.on("message", (message) => {
    commandHandler.handleMessage(message);
    monkeyMessage(message);
});
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map