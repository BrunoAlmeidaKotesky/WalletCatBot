import {Attachment, TextChannel} from 'discord.js';
import { CommandContext } from '../CommandsCtx';
import { ICommand } from '../models/typings/interfaces';
import {getConnection} from 'typeorm';
import CommandsImages from '../models/entity/ComandsImages';
import { blue } from 'colors';
import DiscordHelper from 'utils/DiscordHelper';
import { CommandImageRepository } from 'repositories/CommandImageRepository';

export class SelectImage implements ICommand {
    public commandNames = ["image"];
    private commandImageRepository: CommandImageRepository;

    constructor() {
        this.commandImageRepository = getConnection('walletcon').getCustomRepository(CommandImageRepository);
    }

    public async run({ args, message, command }: CommandContext): Promise<void> {
        const customCommand = args[0];
        if(customCommand){
            const serverUUID = message.guild.id;
            const query = `ty.customCommandName IN ('${customCommand}') and sv.serverUUID = ${serverUUID}`;
            const commands = await this.commandImageRepository.selectImage(query, 'MANY') as CommandsImages[];  
            console.log(blue('Query'), commands);

            if(commands) {
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
                    const userResponse = await DiscordHelper.getUserMessage(`Há ${commands.length} comandos com este nome neste servidor, por favor selecione entre: \n${stringCommands}`, message.channel, message.author);
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

    public getHelpMessage = (commandPrefix: string) => `${commandPrefix}image [nome_do_comando]`;
    public hasPermissionToRun = (parsedUserCommand: CommandContext) => true;

}