import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import ServersList from '../models/entity/ServersList';
import CommandsImages from '../models/entity/ComandsImages';
import MessageType from '../models/entity/MessageType';
import {green} from 'colors';
import { Guild } from 'discord.js';

export async function connectToDatabase(){
    const connection = await createConnection({
        name: "walletcon",
        type: "mssql",
        host: "localhost",
        port: 1433,
        username: 'Wallet',
        password: "ugaugabuga",
        database: "walletcatdb",
        entities: [ServersList, CommandsImages, MessageType],
    });
   return connection;
}

export async function registerNewServer(guild: Guild) {
  const con = getConnection('walletcon');
  const serverUUID  = guild.id;
  const serverList = new ServersList();
  const actualServer = await con.getRepository(ServersList).findOne({where: {serverUUID}});
  if(!actualServer) {
    serverList.serverName = guild.name;
    serverList.serverOwner = guild.ownerID;
    serverList.serverUUID = serverUUID;
    const {id} = await con.manager.save(serverList);
    if(id){
      console.log(green(`Servidor ${id} cadastrado com sucesso!`));
    }
  }
}