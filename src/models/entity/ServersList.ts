import 'reflect-metadata';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import CommandsImages from './ComandsImages';

@Entity({name: 'ServersList'})
export default class ServersList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serverUUID: string;

    @Column()
    serverName: string;

    @Column()
    serverOwner: string;
    @OneToMany(() => CommandsImages, img => img.id_image)
    images: CommandsImages[];
}