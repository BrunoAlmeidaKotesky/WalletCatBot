"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeGenerator = void 0;
const tslib_1 = require("tslib");
class MemeGenerator {
    constructor() {
        this.commandNames = ["meme"];
        this.getHelpMessage = (commandPrefix) => `Modo de uso: ${commandPrefix}meme\n Arquivo em .jpg ou .png e mensagem`;
        this.hasPermissionToRun = (parsedUserCommand) => true;
    }
    run({ args, message, command }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
                message.channel.send("Você não tem permissão para gerenciar mensagens.");
            if (message.attachments) {
                for (const key in message.attachments) {
                    const attachment = message.attachments[key];
                    console.log(attachment);
                }
            }
        });
    }
}
exports.MemeGenerator = MemeGenerator;
//# sourceMappingURL=memegen.js.map