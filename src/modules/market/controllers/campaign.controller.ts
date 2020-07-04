import { Controller, Get, Header, Param, Query, Res, UseGuards } from '@nestjs/common';
import {AppLogger} from '../../../logger/logger';
import {CampaignProvider} from "../providers/campaign.provider";
import {ApiParams} from "./api-params.enum";
import {GetMinimumSpendCampaignsRequestDto} from "../models/dto/get-minimum-spend-campaigns-request.dto";
import { DataUpdateCheckGuard } from '../../../guards/data-update-check.guard';

@Controller('campaign')
@UseGuards(DataUpdateCheckGuard)
export class CampaignController {
  protected TAG: string = `${this.constructor.name}`;

  constructor(
      private readonly campaignProvider: CampaignProvider,
  ) {
    AppLogger.log('Init', this.TAG);
  }

  @Get(`:${ApiParams.CAMPAIGN_ID}`)
  public async getCampaignInformation(@Param(ApiParams.CAMPAIGN_ID) campaignId: string) {
    return await this.campaignProvider.getCampaignInformationById(campaignId);
  }

  @Get('download-csv')
  @Header('Content-Type', 'application/csv')
  @Header('Content-Disposition', 'attachment; filename=campaigns.csv')
  public async getCampaignsExcelFile(@Res() res) {
    const fileName = await this.campaignProvider.generateCampaignsCsv();
    res.sendFile(fileName, {
      root: 'public',
    });
  }

  @Get(`analytics/minimal-spend`)
  public async getCampaignsWithMinimalSpend(@Query() queryData: GetMinimumSpendCampaignsRequestDto): Promise<any> {
    return await this.campaignProvider.getCampaignsForMinimumSpend(Number(queryData.minSpend));
  }
}
