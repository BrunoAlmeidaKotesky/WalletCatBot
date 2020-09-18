"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedCommand = void 0;
const tslib_1 = require("tslib");
const Discord = tslib_1.__importStar(require("discord.js"));
class EmbedCommand {
    constructor() {
        this.commandNames = ["uinfo", "myinfo"];
    }
    getHelpMessage(commandPrefix) {
        return `Modo de utilização: ${commandPrefix}uinfo
                  Traz alguns detalhes da sobre a sua conta.`;
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
    run({ message, args, command }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let container = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription("**Informações sobre o usuário.**")
                .setColor("#fff")
                .addField("Nome de usuário: ", `${message.author.username}#${message.author.discriminator}`)
                .addField("ID: ", `${message.author.id}`)
                .addField("Criado em: ", `${message.author.createdAt}`)
                .setImage(message.author.avatarURL);
            message.channel.sendEmbed(container);
            return;
        });
    }
}
exports.EmbedCommand = EmbedCommand;
//# sourceMappingURL=uinfo.js.map