import {EntityRepository, Repository} from "typeorm";
import ServersList from "../models/entity/ServersList";

@EntityRepository(ServersList)
export class ServersListRepository extends Repository<ServersList> {

    public findServer(serverUUID: string) {
        return this.findOne({serverUUID}, { where: { serverUUID } });
    }
}