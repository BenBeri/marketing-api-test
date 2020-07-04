import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { AmplifyService } from '../modules/shared/services/amplify/amplify.service';
import { ConfigService } from '../config/config.service';
import { GetCampaignsResponseDto } from '../modules/shared/services/amplify/dtos/get-campaigns-response.dto';
import { GetCampaignSectionsResponseDto } from '../modules/shared/services/amplify/dtos/get-campaign-sections-response.dto';
import { CampaignProvider } from '../modules/market/providers/campaign.provider';

@Injectable()
export class CampaignScheduler {

    private isSchedulingDataUpdate: boolean = false;

    public constructor(
        private readonly configService: ConfigService,
        private readonly amplifyService: AmplifyService,
        private readonly campaignProvider: CampaignProvider,
    ) {
    }

    @Timeout(1000)
    public async loadCampaigns() {
        this.isSchedulingDataUpdate = true;
        let allCampaigns: GetCampaignsResponseDto[] = await this.amplifyService
            .getCampaginsForMarketer(this.configService.marketerId);

        const now = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        const budgetIdsSectionsLoaded = [];

        for (const campaign of allCampaigns) {
            const budgetId = campaign.budget.id;
            if (budgetIdsSectionsLoaded.indexOf(budgetId) > -1) {
                continue;
            }
            const sections: GetCampaignSectionsResponseDto[] = await this.amplifyService.getAllSectionsByBudgetId(
                this.configService.marketerId,
                budgetId,
                lastYear,
                now);

            budgetIdsSectionsLoaded.push(budgetId);

            // Updating for all in case of multiple campaigns with same budget
            allCampaigns.filter(c => c.budget.id === budgetId).forEach(c => c.budget.sections = sections);

            console.log(`sections loaded for budget id ${budgetId}:`, sections.length);
        }

        console.log('Finished loading data, now pushing to database ...');
        await this.campaignProvider.addAllCampaigns(allCampaigns);
        console.log('Caching process done!');
        this.isSchedulingDataUpdate = false;

    }

    public isCurrentlyLoadingData() {
        return this.isSchedulingDataUpdate;
    }
}
