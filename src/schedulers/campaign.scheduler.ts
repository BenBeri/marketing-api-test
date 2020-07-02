import {Injectable} from "@nestjs/common";
import { Cron, Timeout } from '@nestjs/schedule';

@Injectable()
export class CampaignScheduler {

    @Cron('* * * * *')
    @Timeout(5)
    loadCampaigns() {
        console.log('test!');
    }
}
