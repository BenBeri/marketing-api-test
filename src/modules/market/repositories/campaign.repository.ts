import {EntityRepository, Repository} from "typeorm";
import {CampaignEntity} from "../models/domain/campaign.entity";

@EntityRepository(CampaignEntity)
export class CampaignRepository extends Repository<CampaignEntity> {

    public async addAll(campaigns: CampaignEntity[]) {
        return await this.save(campaigns);
    }

    public async getAll() {
        return await this.find({relations: ['budget']});
    }

    public async deleteAll() {
        return await this.delete({});
    }
}
