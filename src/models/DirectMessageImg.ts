import { Connection, getConnection } from 'typeorm';
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

    private async getImage(con: Connection, whereQuery: string, type: 'MANY'|'ONE') {
        switch(type) {
           case 'MANY':
            return await con.getRepository(CommandsImages)
                .createQueryBuilder('cd')
                .innerJoinAndSelect('cd.serverID', 'sv')
                .innerJoinAndSelect('cd.messageTypeId', 'ty')
                .where(whereQuery).getMany();
           case 'ONE':
            return await con.getRepository(CommandsImages)
                .createQueryBuilder('cd')
                .innerJoinAndSelect('cd.serverID', 'sv')
                .innerJoinAndSelect('cd.messageTypeId', 'ty')
                .where(whereQuery).getOne();
        }
        
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
                    const userResponse = await this.getUserMessage('Informe o nome do comando para está mensagem. (Ex: +image [nomecomando]');

                    newMessageType.nameType = MessagesEnum.DIRECT;
                    newMessageType.customCommandName = userResponse;
                    const createdType = await con.manager.save(newMessageType);
                    console.log(createdType);
                    if(createdType){
                        newImageMessage.messageTypeId = createdType;
                        const newData = await con.manager.save(newImageMessage);

                        if (newData) {
                            this.message.channel.send(`Cadastrado nova imagem e novo comando, utilize usando +image ${userResponse}`);
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

    public async removeDirectMsg() {
        const con = getConnection('walletcon');
        if(this.type === MessagesEnum.DIRECT) {
            const messageToRemove = await this.getUserMessage('Informe o nome do comando de imagem para remover.');
            const serverUUID = this.message.guild.id;
            if(this.verifyPermission()) {
                const adminQuery = `ty.customCommandName = '${messageToRemove}' and sv.serverUUID = '${serverUUID}'`;
                const commandUser = await this.getImage(con, adminQuery, 'MANY') as CommandsImages[];
                if(commandUser && commandUser?.length >= 1) {
                    const messageTypeIds = commandUser.map(i => i.messageTypeId.idMessageType);
                    await con.getRepository(CommandsImages).remove(commandUser[0]);
                    await con.getRepository(MessageType).delete(messageTypeIds);
                }
                else {
                    this.message.channel.send('Não há nenhum comando com este nome.');
                }
            }
            else {
                const userId = this.message.guild.me.id;
                const userQuery = `ty.customCommandName = '${messageToRemove}' and sv.serverUUID = '${serverUUID}' and cd.sentByUserId = '${userId}'`;
                const commandUser = await this.getImage(con, userQuery, 'ONE');
                if(commandUser) {
                    if(!Array.isArray(commandUser)){
                        const messageTypeIds = commandUser.messageTypeId;
                        await con.getRepository(CommandsImages).remove(commandUser);
                        await con.getRepository(MessageType).delete(messageTypeIds);

                    }
                }
                else {
                    this.message.channel.send('Não foi possível remover a mensagem, a mensagem com este nome pode não existir ou você não tem a permissão para deleta-la.');
                }
            }
        }
    }

    private verifyPermission(): boolean {
        return (this.message.member.guild.me.hasPermission('MANAGE_MESSAGES') || 
                this.message.member.guild.me.hasPermission('ADMINISTRATOR'));
    }

    private async getUserMessage(bMessage: string){
        const botMsg = await this.message.channel.send(bMessage);
        const filter = (m: Message) => m.author.id === this.message.author.id;
        const userResponses = await botMsg.channel.awaitMessages(filter, { max: 1 });
        const userResponse = userResponses?.first()?.content;
        return userResponse;
    }
    
}