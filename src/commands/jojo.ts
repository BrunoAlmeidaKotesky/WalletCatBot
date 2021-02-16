import { Message } from 'discord.js';
import { CommandContext } from '../CommandsCtx';
import { ICommand } from '../models/typings/interfaces';
import { jojoGirls } from '../utils/constants';

type JojoMessage = {message: string, file: string, commandName: string};
export class Sexta implements ICommand {
    public commandNames = ["jojo"]; 
    private readonly messages:JojoMessage[] = [
        {message: "Hoje é sexta piazada!", file: "https://imgur.com/C5bmKpF.jpg", commandName: 'sexta'},
        {message: "Quase sexta...", file: "https://imgur.com/80VIWaV.jpg", commandName: "quinta"},
        {message: "Tamo na metade tropinha", file: "https://imgur.com/TkSbO7U.jpg", commandName: "quarta"},
        {message: "Bora estuda!", file: "https://imgur.com/O8ZuSGq.jpg", commandName: "terca"},
        {message: "Mais uma semana de quarentena", file: "https://imgur.com/AqQLMSS.jpg", commandName: "segunda"},
        {message: "Mais um sábado qualquer", file: "https://imgur.com/QazlB3f.jpg", commandName: "sabado"},
        {message: "Domingão nada muda, é almoço com a familía!", file: "https://imgur.com/ZVz5Ucq.jpg", commandName: "domingo"},
        {message: "Hoje é dia de azar", file: "https://imgur.com/VKsT1zs.jpg", commandName: "mista"},
        {message: "O macho passou vergonha, manas.", file: jojoGirls[Math.floor(Math.random()*jojoGirls.length)], commandName: "vergonha"}
    ];

    async run({ args, message, command }: CommandContext): Promise<void> {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) message.channel.send("Você não tem permissão para gerenciar mensagens.");
        await this.jojoDayOfTheWeek(args[0], message);
    }

    private async jojoDayOfTheWeek(commandMessage: string, msgObj: Message) {
        if(!commandMessage) {
            msgObj.channel.send('Seguinte o adm não quis programar isso ai ainda.');
            msgObj.delete(2800);
        }
        await msgObj.channel.send(this.messages.find(({commandName}) => commandMessage === commandName));
        msgObj.delete(2800);
    }

    getHelpMessage(commandPrefix: string): string {
          return `Modo de uso: ${commandPrefix}jojo [muie, segunda, terca, quarta, quinta, sexta, sabado, domingo, festa, dia4],
                  Retorna uma imagem da jojofeira, pqp q util`; 
    }
      
    hasPermissionToRun=(parsedUserCommand: CommandContext)=> true;

}
