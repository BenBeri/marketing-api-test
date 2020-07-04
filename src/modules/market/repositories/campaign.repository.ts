import {EntityRepository, MoreThanOrEqual, Repository} from "typeorm";
import {CampaignEntity} from "../models/domain/campaign.entity";

@EntityRepository(CampaignEntity)
export class CampaignRepository extends Repository<CampaignEntity> {

    public async addAll(campaigns: CampaignEntity[]) {
        return await this.save(campaigns);
    }

    public async getAll(relations: any[] = []) {
        return await this.find({relations});
    }

    public async deleteAll() {
        return await this.delete({});
    }

    public async getCampaignById(campaignId: string): Promise<CampaignEntity> {
        return await this.findOne({where: {amplifyCampaignId: campaignId}, relations: ['budget']});
    }

    public async getLastYearCampaigns() {
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        return await this.find({
            where: {
                campaignCreationTime: MoreThanOrEqual(lastYear),
            },
            relations: ['budget']
        })
    }

    public async getCampaignByIdWithSections(campaignId: string) {
        return await this.findOne({where: {amplifyCampaignId: campaignId}, relations: ['budget', 'budget.sections']});
    }

    public async getAllWithMinimumSpend(minSpend: number) {
        return await this.createQueryBuilder('campaign')
            .innerJoinAndSelect('campaign.budget', 'budget')
            .innerJoinAndSelect('campaign.liveStatus', 'liveStatus')
            .where(`liveStatus.amountSpent > ${minSpend}`)
            .getMany();
    }
}
