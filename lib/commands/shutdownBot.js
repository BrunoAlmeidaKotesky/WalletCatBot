"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = void 0;
const tslib_1 = require("tslib");
class Shutdown {
    constructor() {
        this.commandNames = ['shutdown'];
        this.hasPermissionToRun = (parsedUserCommand) => {
            if (parsedUserCommand.message.author.id != "205401799149092864")
                return true;
        };
    }
    run({ message, args, command }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (message.author.id != "205401799149092864")
                message.channel.send("Este comando é proibido");
            try {
                yield message.channel.send("Desligando o bot...");
                process.exit(2);
            }
            catch (e) {
                message.channel.send(`Erro: ${e.message}`);
            }
        });
    }
    getHelpMessage(commandPrefix) {
        return `Modo de utilização: ${commandPrefix}shutdown
            Desliga o bot.`;
    }
}
exports.Shutdown = Shutdown;
//# sourceMappingURL=shutdownBot.js.map