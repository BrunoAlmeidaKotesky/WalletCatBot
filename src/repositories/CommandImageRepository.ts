import {EntityRepository, Repository} from "typeorm";
import ComandsImages from "../models/entity/ComandsImages";
type GetType = 'MANY'|'ONE';

@EntityRepository(ComandsImages)
export class CommandImageRepository extends Repository<ComandsImages> {

    public async selectImage(whereQuery: string, type: GetType){
        switch(type) {
           case 'MANY':
            return await this
                .createQueryBuilder('cd')
                .innerJoinAndSelect('cd.serverID', 'sv')
                .innerJoinAndSelect('cd.messageTypeId', 'ty')
                .where(whereQuery).getMany();
           case 'ONE':
            return await this
                .createQueryBuilder('cd')
                .innerJoinAndSelect('cd.serverID', 'sv')
                .innerJoinAndSelect('cd.messageTypeId', 'ty')
                .where(whereQuery).getOne();
        }
    }

    public async deleteImage(instance: ComandsImages|ComandsImages[]) {
        this.remove(instance as ComandsImages);
    }

    public async createImage(instance: ComandsImages) {
        return this.save(instance);
    }
}