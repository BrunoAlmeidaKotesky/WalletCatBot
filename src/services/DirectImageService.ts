import { getConnection } from 'typeorm';
import {Message, RichEmbed} from 'discord.js';
import {PossibileFileTypes} from '../models/typings/types';
import MessageType, {MessagesEnum} from '../models/entity/MessageType';
import CommandsImages from '../models/entity/ComandsImages';
import DiscordHelper from '../utils/DiscordHelper';
import { green } from 'colors';
import {IBaseImageService} from 'services/BaseImageService';
import { CommandImageRepository } from '../repositories/CommandImageRepository';
import { MessageTypeRepository } from '../repositories/MessageTypeRepository';
import { ServersListRepository } from 'repositories/ServerListRepository';


export default class DirectImageService implements IBaseImageService {
    private commandImgRepository: CommandImageRepository;
    private msgTypeRepository: MessageTypeRepository;
    private serverRepository: ServersListRepository;

    constructor(private message: Message, private file: PossibileFileTypes) {
        this.message = message;
        this.file = file;
        const connection = getConnection('walletcon');
        this.commandImgRepository = connection.getCustomRepository(CommandImageRepository);
        this.msgTypeRepository = connection.getCustomRepository(MessageTypeRepository);
        this.serverRepository = connection.getCustomRepository(ServersListRepository);
    }

    public async addImage(){
        try {
            const newImageMessage = new CommandsImages();
            const newMessageType = new MessageType();
            if (typeof this.file === 'string')
                newImageMessage.imageUrl = this.file;
            else return this.message.channel.send('Erro, tente o comando novamente com uma url ou arquivo válido');

            newImageMessage.channelId = this.message.channel.id;
            newImageMessage.sentByUserId = this.message.author.id;

            const serverUUID = this.message.guild.id;
            const serverInstance = await this.serverRepository.findServer(serverUUID);
            if (serverInstance) {
                console.log(serverInstance);
                newImageMessage.serverID = serverInstance;
                const userResponse = await DiscordHelper.getUserMessage('Informe o nome do comando para está mensagem. (Ex: +image [nomecomando]', this.message.channel, this.message.author);

                newMessageType.nameType = MessagesEnum.DIRECT;
                newMessageType.customCommandName = userResponse;
                const createdType = await this.msgTypeRepository.createMessage(newMessageType);
                console.log(createdType);
                if(createdType){
                    newImageMessage.messageTypeId = createdType;
                    const newData = await this.commandImgRepository.createImage(newImageMessage);
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

    public async removeImage() {
        const messageToRemove = await DiscordHelper.getUserMessage('Informe o nome do comando de imagem para remover.', this.message.channel, this.message.author);
        const serverUUID = this.message.guild.id;
        if(DiscordHelper.verifyUserPerm(this.message.member.guild.me)) {
            const adminQuery = `ty.customCommandName = '${messageToRemove}' and sv.serverUUID = '${serverUUID}'`;
            const userCommands = await this.commandImgRepository.selectImage(adminQuery, 'MANY') as CommandsImages[];
            if(userCommands && userCommands?.length >= 1) {
                const messageTypeIds = userCommands.map(i => i.messageTypeId.idMessageType);
                await this.commandImgRepository.deleteImage(userCommands[0]);
                await this.msgTypeRepository.deleteMessageType(messageTypeIds);
            }
            else this.message.channel.send('Não há nenhum comando com este nome.');
        }
        else {
            const userId = this.message.author.id;
            const userQuery = `ty.customCommandName = '${messageToRemove}' and sv.serverUUID = '${serverUUID}' and cd.sentByUserId = '${userId}'`;
            const commandUser = await this.commandImgRepository.selectImage(userQuery, 'ONE');
            if(commandUser) {
                if(!Array.isArray(commandUser)){
                    const messageTypeIds = commandUser.messageTypeId;
                    await this.commandImgRepository.deleteImage(commandUser);
                    await this.msgTypeRepository.deleteMessageType(messageTypeIds);
                }
            }
            else this.message.channel.send('Não foi possível remover a mensagem, a mensagem com este nome pode não existir ou você não tem a permissão para deleta-la.');  
        }
    }

    public async listMessages() {
        let listMsg = await DiscordHelper.getUserMessage('Deseja listar todos os comandos de mensagem do servidor ou apenas as suas? Digite [me/all]', this.message.channel, this.message.author);
        listMsg = listMsg.toUpperCase();
        
        let query = '';
        const serverUUID = this.message.guild.id;
        let msgs: CommandsImages[];
        if(listMsg === 'me'.toUpperCase()) {
            let userId = this.message.author.id;
            query = `sv.serverUUID = '${serverUUID}' and cd.sentByUserId = '${userId}' and ty.nameType = 'DIRECT'`;    
            msgs = await this.commandImgRepository.selectImage(query, 'MANY') as CommandsImages[];
        }
        else if (listMsg === 'all'.toUpperCase()) {
            query = `sv.serverUUID = '${serverUUID}' and ty.nameType = 'DIRECT'`;    
            msgs = await this.commandImgRepository.selectImage(query, 'MANY') as CommandsImages[];
        }
        else this.message.channel.send('Você deve digitar me ou all');
        if(msgs.length > 0) {
            this.displayEmbed(msgs);
        }
        else this.message.channel.send('Não há comandos');
    }

    private displayEmbed(msgs: CommandsImages[]) {
        const allComandsNames:string = msgs.map(c => c.messageTypeId.customCommandName).join(', ');
        const embed = new RichEmbed().setColor('#fff')
        .setTitle(`Você possui ${msgs.length} comandos de imagens do tipo DIRECT`)
        .setAuthor('Wallet Cat', 'https://github.com/BrunoAlmeidaKotesky/WalletCatBot')
        .setDescription('Mensagens do tipo DIRECT são as imagens que são postadas atráves do comando +image [nome_do_comando]')
        .setThumbnail('https://cdn.discordapp.com/avatars/598617854236950540/1eccb5640b4f36ca90c41fbcb9a4806f.png?size=256.png')
        .addField('Comandos', allComandsNames, true)
        this.message.channel.send(embed);
    }
}