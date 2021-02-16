import { LetterGifs } from '../utils/constants';
import { CommandContext } from '../CommandsCtx';
import { ICommand } from '../models/typings/interfaces';

export class GifMaker implements ICommand {
    public commandNames = ["gif"];

    async run({ args, message, command }: CommandContext): Promise<void> {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) message.channel.send("Você não tem permissão para gerenciar mensagens.");

        let sentText = args.join();
        let lettersArray = [...sentText].filter(s => s !== ',');
        if(lettersArray.length <= 15){
            let gifImages = lettersArray.map(l => {
                return LetterGifs.find(p => p.letter.toLocaleUpperCase() === l.toLocaleUpperCase());
            });
    
            for await (const gif of gifImages) {
                if(gif.gifUrl && gif.letter)
                  message.channel.send(gif.gifUrl)
            }
        }
        else message.channel.send('Sua mensagem possui mais de 15 caracteres, isso ocorre para evitar spam.')

    }

    getHelpMessage=(commandPrefix: string) => `Modo de uso: +gif <texto de no max 30 caracteres>, Retorna cada caracter em um gif dançando.`; 
    
      
    hasPermissionToRun=(parsedUserCommand: CommandContext)=> true;

}
