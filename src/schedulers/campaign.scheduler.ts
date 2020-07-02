import {Injectable} from "@nestjs/common";
import { Cron, Timeout } from '@nestjs/schedule';
import {AmplifyService} from "../modules/shared/services/amplify/amplify.service";
import {ConfigService} from "../config/config.service";
import {GetCampaignsResponseDto} from "../modules/shared/services/amplify/dtos/get-campaigns-response.dto";
import {CampaignService} from "../modules/market/services/campaign.service";

@Injectable()
export class CampaignScheduler {

    public constructor(
        private readonly configService: ConfigService,
        private readonly amplifyService: AmplifyService,
        private readonly campaignService: CampaignService,

    ) {}

    @Timeout(1000)
    public async loadCampaigns() {
        const campaigns: GetCampaignsResponseDto[] = await this.amplifyService
            .getCampaginsForMarketer(this.configService.marketerId);
        await this.campaignService.addOrUpdateCampaigns(campaigns);
    }
}
