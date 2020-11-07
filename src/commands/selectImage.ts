import {Attachment, Message, TextChannel} from 'discord.js';
import { CommandContext } from '../CommandsCtx';
import { ICommand } from '../typings/interfaces';
import {getConnection, In} from 'typeorm';
import CommandsImages from '../models/entity/ComandsImages';
import { blue } from 'colors';

export class SelectImage implements ICommand {
    public commandNames = ["image"];

    public async run({ args, message, command }: CommandContext): Promise<void> {
        const customCommand = args[0];
        if(customCommand){
            const con = getConnection('walletcon');
            const serverUUID = message.guild.id;
            const commands = await con.getRepository(CommandsImages)
            .createQueryBuilder('cd')
            .innerJoinAndSelect('cd.serverID', 'sv')
            .innerJoinAndSelect('cd.messageTypeId', 'ty')
            .where(`ty.customCommandName IN ('${customCommand}') and sv.serverUUID = ${serverUUID}`).getMany();  
            console.log(blue('Query'), commands);

            if(commands){
                if(commands.length === 0) 
                    message.channel.send("Não há nenhum comando " + customCommand + "cadastrado neste servidor");
                else if(commands.length  === 1) {
                    if(commands[0]?.imageUrl)
                        message.channel.send(commands[0].imageUrl);
                    else if(commands[0]?.imageFile) {
                        let attachment = new Attachment(commands[0]?.imageFile);
                        (message.channel as TextChannel).send(attachment);
                    }
                }
                else if(commands.length > 1) {
                    const allCommands = commands.map((v, idx)=> {
                        return {name: `${v?.messageTypeId?.customCommandName}_${idx + 1}`, url: v.imageUrl, file: v?.imageFile};
                    });
                    const commandsNames = allCommands.map(n => n.name);
                    const stringCommands = commandsNames.join(', ');                   
                    const userResponse = await this.getUserMessage(`Há ${commands.length} comandos com este nome neste servidor, por favor selecione entre: \n${stringCommands}`, message);
                    let counter = 0;
                    allCommands.forEach(c => {
                        if(c.name === userResponse) {
                            counter++;
                            if(c?.url)
                              message.channel.send(c.url);
                           else if(c?.file) {
                                let attachment = new Attachment(c.file);
                                (message.channel as TextChannel).send(attachment);
                           }
                        }
                    });
                    if(counter === 0){
                       message.channel.send(`O comando ${userResponse} não existe.`);
                    }
                }
            }
            else message.channel.send('Ocorreu um erro na busca');
        
        }
        else message.channel.send('Você deve especificar um comando criado neste servidor');
        

    }

    private async getUserMessage(bMessage: string, message: Message){
        const botMsg = await message.channel.send(bMessage);
        const filter = (m: Message) => m.author.id === message.author.id;
        const userResponses = await botMsg.channel.awaitMessages(filter, { max: 1 });
        const userResponse = userResponses?.first()?.content;
        return userResponse;
    }

    public getHelpMessage = (commandPrefix: string) => `${commandPrefix}image [nome_do_comando]`;
    public hasPermissionToRun = (parsedUserCommand: CommandContext) => true;

}