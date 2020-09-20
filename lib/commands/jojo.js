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
                yield message.channel.send('Bora marca essa porra?', { files: ['https://www.youtube.com/watch?v=Awu2sgBphco'] });
                message.delete(1700);
            }
            else if (args[0] === 'segunda') {
                yield message.channel.send('Pqp, hoje tem brunesco de novo', { files: ['https://imgur.com/AqQLMSS.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'terca') {
                yield message.channel.send('Bora estuda!', { files: ['https://imgur.com/O8ZuSGq.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'quinta') {
                yield message.channel.send('Quase sexta...', { files: ['https://imgur.com/80VIWaV.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'sabado') {
                yield message.channel.send('Hmm... café quentinho...', { files: ['https://imgur.com/QazlB3f.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'domingo') {
                yield message.channel.send('Domingão nada muda, é almoço com a familía!', { files: ['https://imgur.com/ZVz5Ucq.jpg'] });
                message.delete(1700);
            }
            else if (args[0] === 'dia4') {
                yield message.channel.send('Faz isso não mano, da azar.', { files: ['https://imgur.com/VKsT1zs.jpg'] });
                message.delete(1700);
            }
            else {
                message.channel.send('Seguinte o adm n quis programar isso blz! usa +jojo <segunda,terca,quarta,quinta,sexta,sabado,domingo,dia,festa,muie>');
                message.delete(1700);
            }
        });
    }
    getHelpMessage(commandPrefix) {
        return `Modo de uso: +jojo [muie, segunda, terca, quarta, quinta, sexta, sabado, domingo, festa, dia4],
                  Retorna uma imagem da jojofeira, pqp q util`;
    }
}
exports.Sexta = Sexta;
//# sourceMappingURL=jojo.js.map