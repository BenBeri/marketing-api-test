import {IsNumber, IsNumberString} from "class-validator";

export class GetMinimumSpendCampaignsRequestDto {
    @IsNumberString()
    minSpend: number;
}
