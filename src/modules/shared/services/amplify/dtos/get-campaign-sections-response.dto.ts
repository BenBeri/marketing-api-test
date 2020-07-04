import {SectionMetadata} from "../interfaces/section-metadata.interface";
import {SectionMetrics} from "../interfaces/section-metrics.interface";

export interface GetCampaignSectionsResponseDto {
    metadata: SectionMetadata;
    metrics: SectionMetrics;
}
