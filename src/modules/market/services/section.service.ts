import {Injectable} from "@nestjs/common";
import {AmplifyService} from "../../shared/services/amplify/amplify.service";
import {ConfigService} from "../../../config/config.service";
import {last} from "rxjs/operators";
import {GetCampaignSectionsResponseDto} from "../../shared/services/amplify/dtos/get-campaign-sections-response.dto";

@Injectable()
export class SectionService {

    public constructor(
        private readonly configService: ConfigService,
        private readonly amplifyService: AmplifyService,
    ) {}

    public async getSectionsForCampaignLastYear(amplifyCampaignId: string): Promise<GetCampaignSectionsResponseDto[]> {
        const today = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        return await this.amplifyService.getAllSectionsForCampaign(this.configService.marketerId, amplifyCampaignId, lastYear, today);
    }
}
