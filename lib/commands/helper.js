"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const tslib_1 = require("tslib");
class HelpCommand {
    constructor(commands) {
        this.commandNames = ["help", "h"];
        this.getHelpMessage = (commandPrefix) => "Você já esta o utilizando❗";
        this.commands = commands;
    }
    run(commandContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            commandContext.message.delete(2000);
            const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));
            if (commandContext.args.length == 0) {
                const commandNames = allowedCommands.map(command => command.commandNames[0]);
                yield commandContext.message.reply(`Informe o nome de um comando!`);
                return;
            }
            const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.args[0]));
            if (!matchedCommand) {
                yield commandContext.message.reply("Comando não entendido! Digite +help para obter uma lista de todos os comandos!");
                return Promise.reject("Comando não existe!");
            }
            else if (allowedCommands.includes(matchedCommand)) {
                yield commandContext.message.reply(this.returnHelpMessageForCommands(matchedCommand, commandContext));
            }
        });
    }
    returnHelpMessageForCommands(command, context) {
        return `${command.getHelpMessage(context.commandPrefix)}\nAlias: ${command.commandNames.join(", ")}`;
    }
    hasPermissionToRun(commandContext) {
        return true;
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=helper.js.map