import {Controller, Get} from '@nestjs/common';
import {AppLogger} from '../../../logger/logger';

@Controller('campaign')
export class CampaignController {
  protected TAG: string = `${this.constructor.name}`;

  constructor(
  ) {
    AppLogger.log('Init', this.TAG);
  }

  @Get()
  public async test() {
  }
}
