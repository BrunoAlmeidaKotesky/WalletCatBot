"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const tslib_1 = require("tslib");
const CommandsCtx_1 = require("./CommandsCtx");
const reactor_1 = require("./commands/reactor");
const helper_1 = require("./commands/helper");
const index_1 = require("./commands/index");
class CommandHandler {
    constructor(prefix) {
        const commandClasses = [index_1.EmbedCommand, index_1.Sexta, index_1.Shutdown, index_1.GifMaker];
        this.commands = commandClasses.map(commandClass => new commandClass());
        this.commands.push(new helper_1.HelpCommand(this.commands));
        this.prefix = prefix;
    }
    handleMessage(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (message.author.bot || !this.isCommand(message))
                return undefined;
            const commandContext = new CommandsCtx_1.CommandContext(message, this.prefix);
            const matchedCommands = this.commands.find(command => command.commandNames.includes(commandContext.command));
            if (!matchedCommands) {
                yield message.reply(`Comando desconhecido. Tente utilizar ${this.prefix}help`);
                yield reactor_1.reactor.failure(message);
            }
            else {
                try {
                    yield matchedCommands.run(commandContext);
                    reactor_1.reactor.success(message);
                }
                catch (r) {
                    console.log(r);
                    reactor_1.reactor.failure(message);
                }
            }
        });
    }
    isCommand(message) {
        return message.content.startsWith(this.prefix);
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map