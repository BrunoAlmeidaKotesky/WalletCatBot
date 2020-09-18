"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GifMaker = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../utils/constants");
class GifMaker {
    constructor() {
        this.commandNames = ["gif"];
        this.getHelpMessage = (commandPrefix) => `Modo de uso: +gif <texto de no max 30 caracteres>, Retorna cada caracter em um gif dançando.`;
        this.hasPermissionToRun = (parsedUserCommand) => true;
    }
    run({ args, message, command }) {
        var e_1, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
                message.channel.send("Você não tem permissão para gerenciar mensagens.");
            let sentText = args.join();
            let lettersArray = [...sentText].filter(s => s !== ',');
            if (lettersArray.length <= 15) {
                let gifImages = lettersArray.map(l => {
                    return constants_1.LetterGifs.find(p => p.letter.toLocaleUpperCase() === l.toLocaleUpperCase());
                });
                try {
                    for (var gifImages_1 = tslib_1.__asyncValues(gifImages), gifImages_1_1; gifImages_1_1 = yield gifImages_1.next(), !gifImages_1_1.done;) {
                        const gif = gifImages_1_1.value;
                        if (gif.gifUrl && gif.letter)
                            message.channel.send(gif.gifUrl);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (gifImages_1_1 && !gifImages_1_1.done && (_a = gifImages_1.return)) yield _a.call(gifImages_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else
                message.channel.send('Sua mensagem possui mais de 15 caracteres, isso ocorre para evitar spam.');
        });
    }
}
exports.GifMaker = GifMaker;
//# sourceMappingURL=gifmaker.js.map