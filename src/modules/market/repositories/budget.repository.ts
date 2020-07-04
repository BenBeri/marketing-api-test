import {EntityRepository, MoreThanOrEqual, Repository} from "typeorm";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {BudgetEntity} from "../models/domain/budget.entity";

@EntityRepository(BudgetEntity)
export class BudgetRepository extends Repository<BudgetEntity> {

    public async addAll(budgets: BudgetEntity[]) {
        return await this.save(budgets);
    }

    public async getAll() {
        return await this.find();
    }

    public async deleteAll() {
        return await this.delete({});
    }
}
