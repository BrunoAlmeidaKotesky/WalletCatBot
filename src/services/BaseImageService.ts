import {Message} from 'discord.js';

export interface IBaseImageService {
    removeImage(): Promise<void>;
    addImage(): Promise<Message>;
    listMessages(): Promise<void>;
}
type GetType = 'MANY'|'ONE';

export default class BaseImageService implements IBaseImageService {
    constructor (private repository: IBaseImageService) {}
    public async removeImage():Promise<void> {
        return await this.repository.removeImage();
    }
    public async addImage():Promise<Message> {
        return await this.repository.addImage();
    }
    public async listMessages(): Promise<void> {
        return await this.listMessages();
    }
}