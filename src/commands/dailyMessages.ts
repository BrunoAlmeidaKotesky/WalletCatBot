import {job} from 'cron';
import {TextChannel, Client} from 'discord.js';

function applyJob(msg: string, file: string, cronTime: string, client: Client) {
    return job({
        timeZone: 'America/Sao_Paulo',
        cronTime,
        onTick: () => {
          const channel = client.channels.find(p => p.id === '203949437331046400');
          if(channel.type === 'text')
            (channel as TextChannel).send(msg, {files: [file]})
        }
    });
}

export function applyMessages(client: Client){
    const sexta = applyJob('Hojé é sexta galero!', 'https://imgur.com/C5bmKpF.jpg', '0 0 11 * * 5', client);
    const domingo = applyJob('Domingão nada muda, é almoço com as amiga!', 'https://imgur.com/ZVz5Ucq', '0 0 11 * * 0', client);
    const quinta = applyJob('Quase sexta...', 'https://imgur.com/80VIWaV', '0 0 11 * * 4', client);
    const sabado = applyJob('Hmm... café quentinho....', 'https://imgur.com/QazlB3f', '0 0 11 * * 6', client);
    const segunda = applyJob('Pqp, hoje tem brunesco de novo', 'https://imgur.com/AqQLMSS', '0 0 11 * * 1', client);
    const terca = applyJob('Bora estuda!', 'https://imgur.com/O8ZuSGq', '0 0 11 * * 2', client);
    const quarta = applyJob('ZAPZAPZAPZAP', 'https://imgur.com/TkSbO7U.jpg', '0 0 11 * * 3', client); 

    quarta.start();
    terca.start();
    segunda.start();
    sabado.start();
    quinta.start();
    domingo.start();
    sexta.start();
}

