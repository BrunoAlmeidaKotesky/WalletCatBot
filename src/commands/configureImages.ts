import { Message } from 'discord.js';
import{ MessagesEnum } from '../models/entity/MessageType';
import { CommandContext } from '../CommandsCtx';
import { ICommand } from '../typings/interfaces';
import {ActionTypes, PossibileFileTypes} from '../typings/types';
import {DirectCommandMsg} from '../models/DirectMessageImg';

export class ImagesMessages implements ICommand {
    public commandNames = ["config"];

    async run({ args, message, command }: CommandContext): Promise<void> {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) message.channel.send("Você não tem permissão para gerenciar mensagens.");
        const actionType = args[0]?.toUpperCase() as ActionTypes;
        const commandType = args[1]?.toUpperCase() as MessagesEnum;
        const imageUrl = args[2];
        if (actionType) {
            switch (actionType) {
                case 'ADD': {
                    await this.verifyMessage(message, 'ADD', commandType, imageUrl);
                    break;
                }
                case 'REMOVE': {
                    await this.verifyMessage(message, 'REMOVE', commandType, imageUrl);
                    break;
                }
                default: message.channel.send('Você deve escolher se vai adicionar ou remover uma imagem, ADD/REMOVE');
            }
        }
        else {
            await message.channel.send('Você deve escolher se vai adicionar ou remover uma imagem, ADD/REMOVE');
        }
    }

    private async verifyMessage(message: Message, type: ActionTypes, commandType: MessagesEnum, imageUrl?: string) {
        if (commandType) {
            const res = this.verifyAttatchmentType(message, imageUrl);
            switch (commandType) {
                case MessagesEnum.DETECTION: {
                    if (type === 'ADD') {
                    }
                    else {

                    }
                }
                case MessagesEnum.DAILY: {
                    if (type == 'ADD') {

                    }
                    else {

                    }
                }
                case MessagesEnum.DIRECT: {
                    if (type === 'ADD') {
                        await this.insertImageToDb(message, res, commandType);
                        break;
                    }
                    else {

                    }
                }
                default: message.channel.send('Você deve escoler o tipo de comando: DIRECT, DETECT, DAILY');
            }
        }
    }

    private verifyAttatchmentType(message: Message, imageUrl: string): PossibileFileTypes {
        if (message?.attachments?.array().length > 0 && imageUrl) {
            const attachment = message.attachments.array()[0];
            message.channel.send('Como foram incluidos anexos, será considerado o arquivo e não a URL');
            if (!attachment?.filename.endsWith('.png') && !attachment?.filename.endsWith('.jpg')) {
                message.channel.send("Seu arquivo deve estar em png ou jpg");
                return null;
            }
            return attachment;
        }
        else if (imageUrl && message?.attachments.array()?.length === 0) {
            return imageUrl;
        }
        else if (message?.attachments?.array()?.length > 0 && !imageUrl) {
            const attachment = message.attachments.array()[0];
            if (!attachment.filename.endsWith('.png') && !attachment.filename.endsWith('.jpg')) {
                message.channel.send("Seu arquivo deve estar em png ou jpg");
                return null;
            }
            return attachment;
        }
        else if (message?.attachments?.array()?.length === 0 && !imageUrl) {
            message.channel.send('Você deve incluir um anexo ou um terceiro parametro com a url da imagem.');
            return null;
        }
    }

    private async removeImageFromDb(message: Message, file: PossibileFileTypes) {
    }

    private async insertImageToDb(message: Message, file: PossibileFileTypes, type: MessagesEnum) {        
        if (type === MessagesEnum.DIRECT) {
            const directInsert = new DirectCommandMsg(type, message, file);
            await directInsert.insertDirectMessage();
        }
    }

    getHelpMessage = (commandPrefix: string) => `${commandPrefix}image [add/remove] [command_name] [url] ou +image [add/remove] [comando] [arquivo]`;
    hasPermissionToRun = (parsedUserCommand: CommandContext) => true;

}

