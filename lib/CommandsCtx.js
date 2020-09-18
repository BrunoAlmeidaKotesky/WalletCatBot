"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandContext = void 0;
class CommandContext {
    constructor(message, prefix) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        this.command = args.shift().toLowerCase();
        this.args = args;
        this.message = message;
        this.commandPrefix = prefix;
    }
}
exports.CommandContext = CommandContext;
//# sourceMappingURL=CommandsCtx.js.map