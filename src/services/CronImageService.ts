import {job} from 'cron';
import { Message, Client, TextChannel } from 'discord.js';
import {IBaseImageService} from 'services/BaseImageService';
import { PossibileFileTypes } from 'models/typings/types';
import {Connection, getConnection} from 'typeorm';

export class CronImageService implements IBaseImageService {
    constructor(private message: Message, private file: PossibileFileTypes){
        this.message = message;
        this.file = file;
    }

    public async addImage() {
        return this.message;
    }

    public async listMessages() {
        return;
    }

    public async removeImage() {
        return;
    }
    
}
