import {Injectable} from "@nestjs/common";
import * as csvWriter from 'csv-writer';
import {CampaignService} from "../services/campaign.service";
import {SectionService} from "../services/section.service";
import {CampaignCsvData} from "../interfaces/campaign-csv-data.interface";
import {transformCampaignDataToCsvData, transformCampaignsDtosToEntities} from "../transformers/campaign.transformer";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {BudgetService} from "../services/budget.service";
import {GetCampaignsResponseDto} from "../../shared/services/amplify/dtos/get-campaigns-response.dto";
import {BudgetEntity} from "../models/domain/budget.entity";
import {transformBudgetsDtosToModels} from "../transformers/budget.transformer";
import {PUBLIC_ROOT} from "../../../main";

@Injectable()
export class CampaignProvider {

    public constructor(
        private readonly campaignService: CampaignService,
        private readonly budgetService: BudgetService,
        private readonly sectionService: SectionService,
    ) {}

    public async addOrUpdateCampaigns(campaignDtos: GetCampaignsResponseDto[], budgetDtos: any[]) {
        const oldCampaigns: CampaignEntity[] = await this.campaignService.getAllCampaignsAndDelete();
        const oldBudgets: BudgetEntity[] = await this.budgetService.getAllBudgetsAndDelete();

        const campaigns: CampaignEntity[] = transformCampaignsDtosToEntities(campaignDtos);
        const budgets: BudgetEntity[] = transformBudgetsDtosToModels(budgetDtos);

       // console.log(budgets);

        try {
            await this.campaignService.addAll(campaigns);
            console.log('budgets', budgets);
            await this.budgetService.addAll(budgets);
        } catch (e) {
            console.log('Failed to update campaigns', e.message);
            await this.campaignService.addAll(oldCampaigns);
            await this.budgetService.addAll(oldBudgets);
            // TODO transaction instead of this later
        }
    }


    public async getCampaignInformationById(campaignId: string) {
        return await this.campaignService.getCampaign(campaignId);
    }

    public async generateCampaignsCsv() {

        const campaigns: CampaignEntity[] = await this.campaignService.getAllCampaignsWithBudgetSections();

        const name = `${new Date().getTime()}-all-campaigns`;
        const objectCsvWriter = csvWriter.createObjectCsvWriter({
            path: `${PUBLIC_ROOT}/${name}`,
            header: [
                {id: 'id', title: 'ID'},
                {id: 'name', title: 'Name'},
                {id: 'budgetAmount', title: 'Budget Amount'},
                {id: 'creationTime', title: 'Creation Time'},
                {id: 'amountSpent', title: 'Amount Spent'},
                {id: 'sectionIds', title: 'Section IDs'}
            ]
        });

        const data: CampaignCsvData[] = [];

        for (const campaign of campaigns) {
            const csvData: CampaignCsvData = transformCampaignDataToCsvData(campaign);
            data.push(csvData);
        }

        await new Promise(resolve => {
            objectCsvWriter.writeRecords(data).then(() => {
                resolve();
            });
        });

        return name;
    }

    public async getCampaignsForMinimumSpend(minSpend: number) {
        return await this.campaignService.getCampaignsWithMinimumSpend(minSpend);
    }
}
