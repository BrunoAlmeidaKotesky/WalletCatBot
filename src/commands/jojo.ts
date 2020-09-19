import { CommandContext } from '../CommandsCtx';
import { ICommand } from '../typings/interfaces';
export class Sexta implements ICommand {
    public commandNames = ["jojo"];

    async run({ args, message, command }: CommandContext): Promise<void> {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) message.channel.send("Você não tem permissão para gerenciar mensagens.");
        
        if(args[0] === 'sexta'){
            await message.channel.send('Hoje é sexta galero!', {files: ['https://imgur.com/C5bmKpF.jpg']})
            message.delete(1700);
        }
        else if(args[0] === 'muie'){
            await message.channel.send('O macho escroto passou vergonha manas', {files: ['https://imgur.com/mAfUchr.jpg']})
            message.delete(1700);
        }
        else if(args[0] === 'quarta'){
            await message.channel.send('ZAPZAPZAPZAP', {files: ['https://imgur.com/TkSbO7U.jpg']})
            message.delete(1700);
        }
        else if(args[0] === 'festa'){
            await message.channel.send('Bora marca essa porra?', {files: ['https://www.youtube.com/watch?v=Awu2sgBphco']})
            message.delete(1700);
        }
        else if(args[0] === 'segunda'){
            await message.channel.send('Pqp, hoje tem brunesco de novo', {files: ['https://imgur.com/AqQLMSS.jpg']})
            message.delete(1700);
        }
        else if(args[0] === 'terca'){
            await message.channel.send('Bora estuda!', {files: ['https://imgur.com/O8ZuSGq.jpg']})
            message.delete(1700);
        }
        else if(args[0] === 'quinta'){
            await message.channel.send('Quase sexta...', {files: ['https://imgur.com/80VIWaV.jpg']})
            message.delete(1700);
        }
        else if(args[0] === 'sabado'){
            await message.channel.send('Hmm... café quentinho...', {files:['https://imgur.com/QazlB3f']})
            message.delete(1700);
        }
        else if(args[0] === 'domingo'){
            await message.channel.send('Domingão nada muda, é almoço com a familía!', {files: ['https://imgur.com/ZVz5Ucq.jpg']})
            message.delete(1700);
        }
        else if(args[0] === 'dia4'){
            await message.channel.send('Faz isso não mano, da azar.', {files: ['https://imgur.com/VKsT1zs.jpg']})
            message.delete(1700);
        }
        else {
             message.channel.send('Seguinte o adm n quis programar isso blz! usa +jojo <segunda,terca,quarta,quinta,sexta,sabado,domingo,dia,festa,muie>')
             message.delete(1700);
        }
    }

    getHelpMessage(commandPrefix: string): string {
          return `Modo de uso: +jojo [muie, segunda, terca, quarta, quinta, sexta, sabado, domingo, festa, dia4],
                  Retorna uma imagem da jojofeira, pqp q util`; 
        }
      
    hasPermissionToRun=(parsedUserCommand: CommandContext)=> true;

}
