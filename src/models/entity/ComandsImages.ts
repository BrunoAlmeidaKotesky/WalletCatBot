import 'reflect-metadata';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import MessageType from './MessageType';
import ServersList from './ServersList';

@Entity({name: 'CommandsImages'})
export default class CommandsImages {
    @PrimaryGeneratedColumn()
    id_image: number;

    @Column()
    sentByUserId: string;

    @Column()
    channelId: string;

    @Column({nullable: true})
    imageUrl: string;

    @Column({nullable: true, type: 'varbinary'})
    imageFile: Buffer;

    @ManyToOne(() => ServersList, (server: ServersList) => server.serverUUID)
    serverID: ServersList;

    @ManyToOne(() => MessageType, (msgType: MessageType) => msgType.idMessageType)
    messageTypeId: MessageType;
}
