import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CampaignScheduler } from '../schedulers/campaign.scheduler';

@Injectable()
export class DataUpdateCheckGuard implements CanActivate {

  public constructor(private readonly campaignSchedulerService: CampaignScheduler) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.campaignSchedulerService.isCurrentlyLoadingData()) {
      throw new HttpException('Currently updating data, please try again later',
        HttpStatus.SERVICE_UNAVAILABLE);
    }
    return true;
  }

}
