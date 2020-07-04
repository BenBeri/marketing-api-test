import {Injectable} from "@nestjs/common";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {CampaignRepository} from "../repositories/campaign.repository";
import {GetCampaignsResponseDto} from "../../shared/services/amplify/dtos/get-campaigns-response.dto";
import {transformCampaignsDtosToEntities} from "../transformers/campaign.transformer";
import {GetCampaignSectionsResponseDto} from "../../shared/services/amplify/dtos/get-campaign-sections-response.dto";

@Injectable()
export class CampaignService {

    public constructor(private readonly campaignRepository: CampaignRepository) {}

    public async getAllCampaignsAndDelete() {
        const campaigns: CampaignEntity[] = await this.campaignRepository.getAll();
        await this.campaignRepository.deleteAll();

        return campaigns;
    }

    public async addAll(campaigns: CampaignEntity[]) {
        return await this.campaignRepository.addAll(campaigns);
    }

    public async getCampaign(id: string): Promise<CampaignEntity> {
        return await this.campaignRepository.getCampaignById(id)
    }

    public async getCampaignWithBudgetSections(id: string) {
        return await this.campaignRepository.getCampaignByIdWithSections(id)
    }

    public async getAllCampaignsWithBudgetSections() {
        return await this.campaignRepository.getAll(['budget', 'budget.sections'])
    }

    public async getLastYearCampaigns() {
        return await this.campaignRepository.getLastYearCampaigns();
    }

    public async addAllCampaigns(allCampaigns: GetCampaignsResponseDto[]) {
        const campaigns: CampaignEntity[] = transformCampaignsDtosToEntities(allCampaigns);
        await this.campaignRepository.addAll(campaigns);
    }

    public async getCampaignsWithMinimumSpend(minSpend: number) {
        return await this.campaignRepository.getAllWithMinimumSpend(minSpend);
    }
}
