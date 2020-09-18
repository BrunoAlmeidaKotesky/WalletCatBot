"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactor = exports.Reactor = void 0;
const SUC_REACTION = ["💚", "👍"];
const FAIL_REACTION = ["❤", "🛑"];
let enableReactions = true;
class Reactor {
    constructor(enableReactions) {
        this.enableReactions = enableReactions;
    }
    success(message) {
        if (!this.enableReactions)
            return;
        return message.react(this.getRandom(SUC_REACTION));
    }
    failure(message) {
        if (!this.enableReactions)
            return;
        return message.react(this.getRandom(FAIL_REACTION));
    }
    getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
exports.Reactor = Reactor;
exports.reactor = new Reactor(enableReactions);
//# sourceMappingURL=reactor.js.map