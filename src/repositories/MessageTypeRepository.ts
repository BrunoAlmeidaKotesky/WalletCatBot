import {EntityRepository, Repository} from "typeorm";
import MessageType from "../models/entity/MessageType";

@EntityRepository(MessageType)
export class MessageTypeRepository extends Repository<MessageType> {

    public async createMessage(instance: MessageType) {
        return await this.save(instance);
    }

    public async deleteMessageType(deleteObj: number[] | MessageType) {
        return this.delete(deleteObj);
    }
}