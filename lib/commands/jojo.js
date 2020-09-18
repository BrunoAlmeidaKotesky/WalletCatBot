"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sexta = void 0;
const tslib_1 = require("tslib");
class Sexta {
    constructor() {
        this.commandNames = ["jojo"];
        this.hasPermissionToRun = (parsedUserCommand) => true;
    }
    run({ args, message, command }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
                message.channel.send("Você não tem permissão para gerenciar mensagens.");
            if (args[0] === 'sexta') {
                yield message.channel.send('Hoje é sexta galero!', { files: ['https://imgur.com/C5bmKpF.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'muie') {
                yield message.channel.send('O macho escroto passou vergonha manas', { files: ['https://imgur.com/mAfUchr.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'quarta') {
                yield message.channel.send('ZAPZAPZAPZAP', { files: ['https://imgur.com/TkSbO7U.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'festa') {
                yield message.channel.send('https://www.youtube.com/watch?v=Awu2sgBphco');
                message.delete(1700);
            }
            else {
                message.channel.send('Seguinte o adm n quis programar isso blz! usa +jojo sexta ou +jojo quarta ou +jojo muie');
                message.delete(1700);
            }
        });
    }
    getHelpMessage(commandPrefix) {
        return `Modo de uso: +jojo [muie, quarta, sexta, festa],
                  Retorna uma imagem da jojofeira, pqp q util`;
    }
}
exports.Sexta = Sexta;
//# sourceMappingURL=jojo.js.map