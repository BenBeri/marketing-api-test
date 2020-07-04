import {Injectable} from "@nestjs/common";
import {Timeout} from '@nestjs/schedule';
import {AmplifyService} from "../modules/shared/services/amplify/amplify.service";
import {ConfigService} from "../config/config.service";
import {GetCampaignsResponseDto} from "../modules/shared/services/amplify/dtos/get-campaigns-response.dto";
import {CampaignService} from "../modules/market/services/campaign.service";
import {GetCampaignSectionsResponseDto} from "../modules/shared/services/amplify/dtos/get-campaign-sections-response.dto";

@Injectable()
export class CampaignScheduler {

    public constructor(
        private readonly configService: ConfigService,
        private readonly amplifyService: AmplifyService,
        private readonly campaignService: CampaignService,
    ) {
    }

    @Timeout(1000)
    public async loadCampaigns() {
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
        await this.campaignService.addAllCampaigns(allCampaigns);
        console.log('Caching process done!');

    }
}
