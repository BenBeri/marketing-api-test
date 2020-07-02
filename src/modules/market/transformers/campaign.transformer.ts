import {GetCampaignsResponseDto} from "../../shared/services/amplify/dtos/get-campaigns-response.dto";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {BudgetEntity} from "../models/domain/budget.entity";

export const transformCampaignsDtosToEntities = (dtos: GetCampaignsResponseDto[]): CampaignEntity[] => {
    return dtos.map(dto => transformCampaignDtoToEntity(dto));
};

export const transformCampaignDtoToEntity = (dto: GetCampaignsResponseDto): CampaignEntity => {
  const entity: CampaignEntity = new CampaignEntity();
  entity.amplifyCampaignId = dto.id;
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

  const budget: BudgetEntity = new BudgetEntity();
  budget.amplifyBudgetId = dto.budget.id;
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

  entity.budget = budget;
  entity.suffixTrackingCode = dto.suffixTrackingCode;
  entity.prefixTrackingCode = dto.prefixTrackingCode;
  entity.liveStatus = dto.liveStatus;
  entity.readonly = dto.readonly;
  entity.startHour = dto.startHour;
  entity.onAirType = dto.onAirType;
  entity.promotedLinksSequences = dto.promotedLinksSequences;
  entity.objective = dto.objective;

  return entity;
};
