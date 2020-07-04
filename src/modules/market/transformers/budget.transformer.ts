import {GetCampaignsResponseDto} from "../../shared/services/amplify/dtos/get-campaigns-response.dto";
import {CampaignEntity} from "../models/domain/campaign.entity";
import {BudgetEntity} from "../models/domain/budget.entity";
import {GetCampaignSectionsResponseDto} from "../../shared/services/amplify/dtos/get-campaign-sections-response.dto";
import {CampaignCsvData} from "../interfaces/campaign-csv-data.interface";

export const transformBudgetsDtosToModels = (dtos: any[]): BudgetEntity[] => {
  return dtos.map(d => transformBudgetDtoToModel(d));
};

export const transformBudgetDtoToModel = (dto: any): BudgetEntity => {
  return {
    id: dto.id,
    name: dto.name,
    shared: dto.shared,
    amount: dto.amount,
    currency: dto.currency,
    creationTime: dto.creationTime,
    lastModified: dto.lastModified,
    startDate: dto.startDate,
    runForever: dto.runForever,
    type: dto.type,
    pacing: dto.pacing,
  }
};
