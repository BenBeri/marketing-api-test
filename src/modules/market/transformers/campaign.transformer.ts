import {GetCampaignsResponseDto} from "../../shared/services/amplify/dtos/get-campaigns-response.dto";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {BudgetEntity} from "../models/domain/budget.entity";
import {CampaignCsvData} from "../interfaces/campaign-csv-data.interface";
import {SectionEntity} from "../models/domain/section.entity";
import {CampaignLiveStatusEntity} from "../models/domain/campaign-live-status.entity";

export const transformCampaignsDtosToEntities = (dtos: GetCampaignsResponseDto[]): CampaignEntity[] => {
    return dtos.map(dto => transformCampaignDtoToEntity(dto));
};

export const transformCampaignDtoToEntity = (dto: GetCampaignsResponseDto): CampaignEntity => {
  const entity: CampaignEntity = new CampaignEntity();
  entity.id = dto.id;
  entity.name = dto.name;
  entity.enabled = dto.enabled;
  entity.campaignCreationTime = dto.creationTime;
  entity.campaignLastModifiedTime = dto.lastModified;
  entity.cpc = dto.cpc;
  entity.autoArchived = dto.autoArchived;
  entity.minimumCpc = dto.minimumCpc;
  entity.currency = dto.currency;
  entity.targeting = dto.targeting;
  entity.marketerId = dto.marketerId;
  entity.contentType = dto.contentType;
  entity.suffixTrackingCode = dto.suffixTrackingCode;
  entity.prefixTrackingCode = dto.prefixTrackingCode;

  const liveStatus = new CampaignLiveStatusEntity();
  liveStatus.campaign = entity;
  liveStatus.amountSpent = dto.liveStatus.amountSpent;
  liveStatus.campaignOnAir = dto.liveStatus.campaignOnAir;
  liveStatus.onAirModificationTime = dto.liveStatus.onAirModificationTime;
  liveStatus.onAirReason = dto.liveStatus.onAirReason;

  entity.liveStatus = liveStatus;

  entity.readonly = dto.readonly;
  entity.startHour = dto.startHour;
  entity.onAirType = dto.onAirType;
  entity.promotedLinksSequences = dto.promotedLinksSequences;
  entity.objective = dto.objective;

  const budget: BudgetEntity = new BudgetEntity();
  budget.id = dto.budget.id;
  budget.name = dto.budget.name;
  budget.shared = dto.budget.shared;
  budget.amount = dto.budget.amount;
  budget.currency = dto.budget.currency;
  budget.creationTime = dto.budget.creationTime;
  budget.lastModified = dto.budget.lastModified;
  budget.startDate = dto.budget.startDate;
  budget.runForever = dto.budget.runForever;
  budget.type = dto.budget.type;
  budget.pacing = dto.budget.pacing;

  const sections: SectionEntity[] = [];

  for (const section of dto.budget.sections) {
    const sectionEntity: SectionEntity = new SectionEntity();
    sectionEntity.id = section.metadata.id;
    sectionEntity.metadata = section.metadata;
    sectionEntity.metrics = section.metrics;

    sections.push(sectionEntity);
  }


  budget.sections = sections;

  entity.budget = budget;

  return entity;
};

export const transformCampaignDataToCsvData = (campaign: CampaignEntity): CampaignCsvData => {

    return {
      id: campaign.id,
      name: campaign.name,
      budgetAmount: campaign.budget.amount,
      creationTime: campaign.campaignCreationTime,
      amountSpent: campaign.liveStatus.amountSpent,
      sectionIds: campaign.budget.sections.map(section => section.metadata.id),
    }
};
