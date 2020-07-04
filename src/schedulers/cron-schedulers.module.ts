import {forwardRef, Module} from '@nestjs/common';
import {SharedModule} from "../modules/shared/shared.module";
import {ConfigModule} from "../config/config.module";
import {CampaignScheduler} from "./campaign.scheduler";
import {MarketModule} from "../modules/market/market.module";

@Module({
    imports: [
        forwardRef(() => ConfigModule),
        SharedModule,
        forwardRef(() => MarketModule),
    ],
    providers: [
        CampaignScheduler,
    ],
    exports: [
      CampaignScheduler,
    ],
})

export class CronSchedulersModule {
}
