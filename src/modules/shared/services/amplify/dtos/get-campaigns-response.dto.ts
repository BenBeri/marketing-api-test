import {CampaignContentType} from "../../../../market/enums/campaign-content-type.enum";
import {BudgetType} from "../../../../market/enums/budget-type.enum";
import {BudgetPacingType} from "../../../../market/enums/budget-pacing-type.enum";
import {GetCampaignSectionsResponseDto} from "./get-campaign-sections-response.dto";

export interface GetCampaignsResponseDto {
    id: string;
    name: string;
    enabled: boolean;
    creationTime: Date;
    lastModified: Date;
    cpc: number;
    autoArchived: boolean;
    minimumCpc: number;
    currency: string;
    targeting: {
        platform: string[],
        language: string,
        excludeAdblockUsers: boolean;
        nativePlacements: {
            enabled: boolean;
        },
        useExtendedNetworkTraffic: boolean;
        includeCellularNetwork: boolean;
        nativePlacementsEnabled: boolean;
    };
    marketerId: string;
    contentType: CampaignContentType;
    budget: {
        id: string;
        name: string;
        shared: boolean;
        amount: number;
        currency: string;
        creationTime: Date;
        lastModified: Date;
        startDate: Date;
        runForever: boolean;
        type: BudgetType;
        pacing: BudgetPacingType;
        sections?: GetCampaignSectionsResponseDto[],
    };
    suffixTrackingCode: string;
    prefixTrackingCode: object;
    liveStatus: {
        onAirReason: string;
        campaignOnAir: boolean;
        amountSpent: number;
        onAirModificationTime: Date;
    };
    readonly: boolean;
    startHour: string;
    onAirType: string;
    promotedLinksSequences: {
        enabled: boolean;
    };
    objective: string;
    amplifyBudgetId?: string;
}
