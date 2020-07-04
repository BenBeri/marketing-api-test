import {Injectable} from "@nestjs/common";
import * as csvWriter from 'csv-writer';
import {CampaignService} from "../services/campaign.service";
import {CampaignCsvData} from "../interfaces/campaign-csv-data.interface";
import {transformCampaignDataToCsvData} from "../transformers/campaign.transformer";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {PUBLIC_ROOT} from "../../../main";
import { GetCampaignsResponseDto } from '../../shared/services/amplify/dtos/get-campaigns-response.dto';

@Injectable()
export class CampaignProvider {

    public constructor(
        private readonly campaignService: CampaignService,
    ) {
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

    public async addAllCampaigns(allCampaigns: GetCampaignsResponseDto[]) {
        await this.campaignService.addAllCampaigns(allCampaigns);
    }
}
