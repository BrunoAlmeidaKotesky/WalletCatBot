import 'reflect-metadata';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import CommandsImages from './ComandsImages';

export enum MessagesEnum {
    DAILY = 'DAILY',
    DIRECT = 'DIRECT',
}

@Entity({name: 'MessageType'})
export default class MessageType {
    @PrimaryGeneratedColumn()
    idMessageType: number;

    @Column()
    nameType: MessagesEnum;
    //Ex
    @Column({nullable: true})
    fromChannel: string;

    @Column({nullable: true})
    toChannel: string;

    @Column({nullable: true})
    customCommandName: string;

    @Column({nullable: true})
    cronTime: string;
    @OneToMany(() => CommandsImages, img => img.id_image)
    images: CommandsImages[];
}