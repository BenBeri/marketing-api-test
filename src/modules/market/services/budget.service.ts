import {Injectable} from "@nestjs/common";
import {BudgetRepository} from "../repositories/budget.repository";
import {BudgetEntity} from "../models/domain/budget.entity";
import {transformBudgetsDtosToModels} from "../transformers/budget.transformer";

@Injectable()
export class BudgetService {

    public constructor(private readonly budgetRepository: BudgetRepository) {

    }

    public async getAllBudgetsAndDelete() {
        const budgets: BudgetEntity[] = await this.budgetRepository.getAll();
        await this.budgetRepository.deleteAll();

        return budgets;
    }

    public async addAll(budgetDtos: any[]) {
        const budgets: BudgetEntity[] = transformBudgetsDtosToModels(budgetDtos);
        return await this.budgetRepository.addAll(budgets);
    }
}
