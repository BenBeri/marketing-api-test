import {EntityRepository, MoreThanOrEqual, Repository} from "typeorm";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {BudgetEntity} from "../models/domain/budget.entity";
import { CampaignLiveStatusEntity } from '../models/domain/campaign-live-status.entity';

@EntityRepository(CampaignLiveStatusEntity)
export class CampaignLiveStatusRepository extends Repository<CampaignLiveStatusEntity> {

    public async deleteAll() {
        return await this.delete({});
    }
}
