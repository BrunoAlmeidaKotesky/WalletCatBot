import { getConnection } from 'typeorm';
import {Message} from 'discord.js';
import {PossibileFileTypes} from '../typings/types';
import MessageType, { MessagesEnum } from './entity/MessageType';
import CommandsImages from './entity/ComandsImages';
import ServersList from './entity/ServersList';
import { green } from 'colors';

export class DirectCommandMsg {
    constructor(private type: MessagesEnum, private message: Message, private file: PossibileFileTypes){
        this.type = type;
        this.message = message;
        this.file = file;
    }

    public async insertDirectMessage(){
        const con = getConnection('walletcon');

        if (this.type === MessagesEnum.DIRECT) {
            try {
                const newImageMessage = new CommandsImages();
                const newMessageType = new MessageType();
                if (typeof this.file === 'string') {
                    newImageMessage.imageUrl = this.file;
                }
                else if (typeof this.file === 'object' || typeof this.file === 'function') {

                }
                else return this.message.channel.send('Erro, tente o comando novamente com uma url ou arquivo válido');
                newImageMessage.channelId = this.message.channel.id;
                newImageMessage.sentByUserId = this.message.author.id;

                const serverUUID = this.message.guild.id;
                const serverInstance = await con.manager.findOne(ServersList, { where: { serverUUID } });
                if (serverInstance) {
                    console.log(serverInstance);
                    newImageMessage.serverID = serverInstance;

                    const botMsg = await this.message.channel.send('Informe o nome do comando para está mensagem. (Ex: +image [nomecomando]');
                    const filter = (m: Message) => m.author.id === this.message.author.id;
                    const userResponses = await botMsg.channel.awaitMessages(filter, { max: 1 });
                    const userResponse = userResponses?.first()?.content;

                    newMessageType.nameType = MessagesEnum.DIRECT;
                    newMessageType.customCommandName = userResponse;
                    const createdType = await con.manager.save(newMessageType);
                    console.log(createdType);
                    if(createdType){
                        newImageMessage.messageTypeId = createdType;
                        const newData = await con.manager.save(newImageMessage);

                        if (newData) {
                            this.message.channel.send(`Cadastrado nova imagem: ${newData} e novo comando, utilize usando +image ${userResponse}`);
                            console.log(green(`Cadastrado nova imagem e novo comando, utilize usando +image ${userResponse}`));
                        }
                        else this.message.channel.send('Ocorreu um erro ao cadastrar a imagem');
                    }
                }

            }
            catch (e) {
                console.log(e);
                this.message.channel.send('Ocorreu um erro ao cadastrar a imagem');
            }
        }
    }
}