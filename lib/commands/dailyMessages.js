"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMessages = void 0;
const cron_1 = require("cron");
function applyJob(msg, file, cronTime, client) {
    return cron_1.job({
        timeZone: 'America/Sao_Paulo',
        cronTime,
        onTick: () => {
            const channel = client.channels.find(p => p.id === '203949437331046400');
            if (channel.type === 'text')
                channel.send(msg, { files: [file] });
        }
    });
}
function applyMessages(client) {
    const sexta = applyJob('Hojé é sexta galero!', 'https://imgur.com/C5bmKpF.jpg', '0 0 11 * * 5', client);
    const domingo = applyJob('Domingão nada muda, é almoço com a familía!', 'https://imgur.com/ZVz5Ucq.jpg', '0 0 11 * * 0', client);
    const quinta = applyJob('Quase sexta...', 'https://imgur.com/80VIWaV.jpg', '0 0 11 * * 4', client);
    const sabado = applyJob('Hmm... café quentinho...', 'https://imgur.com/QazlB3f.jpg', '0 0 11 * * 6', client);
    const segunda = applyJob('Pqp, hoje tem brunesco de novo', 'https://imgur.com/AqQLMSS.jpg', '0 0 11 * * 1', client);
    const terca = applyJob('Bora estuda!', 'https://imgur.com/O8ZuSGq.jpg', '0 0 11 * * 2', client);
    const quarta = applyJob('ZAPZAPZAPZAP', 'https://imgur.com/TkSbO7U.jpg', '0 0 11 * * 3', client);
    const dia4 = applyJob('Hoje é dia de azar', 'https://imgur.com/VKsT1zs.jpg', '0 0 11 4 * *', client);
    dia4.start();
    quarta.start();
    terca.start();
    segunda.start();
    sabado.start();
    quinta.start();
    domingo.start();
    sexta.start();
}
exports.applyMessages = applyMessages;
//# sourceMappingURL=dailyMessages.js.map