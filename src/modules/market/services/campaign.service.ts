import {Injectable} from "@nestjs/common";
import {GetCampaignsResponseDto} from "../../shared/services/amplify/dtos/get-campaigns-response.dto";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {transformCampaignsDtosToEntities} from "../transformers/campaign.transformer";
import {CampaignRepository} from "../repositories/campaign.repository";

@Injectable()
export class CampaignService {

    public constructor(private readonly campaignRepository: CampaignRepository) {}

    public async addOrUpdateCampaigns(campaignDtos: GetCampaignsResponseDto[]) {
        const oldCampaigns: CampaignEntity[] = await this.campaignRepository.getAll();
        await this.campaignRepository.deleteAll();

        const campaigns: CampaignEntity[] = transformCampaignsDtosToEntities(campaignDtos);

        try {
            return await this.campaignRepository.addAll(campaigns);
        } catch (e) {
            console.log('Failed to update campaigns', e.message);
            await this.campaignRepository.addAll(oldCampaigns);
            // TODO save to local file as well as error log with values
        }
    }
}
