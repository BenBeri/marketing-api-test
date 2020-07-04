import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CampaignController} from './controllers/campaign.controller';
import {GuardModule} from '../../guards/guard.module';
import {ConfigModule} from '../../config/config.module';
import {BudgetEntity} from "./models/domain/budget.entity";
import {CampaignEntity} from "./models/domain/campaign.entity";
import {SharedModule} from "../shared/shared.module";
import {CampaignRepository} from "./repositories/campaign.repository";
import {CampaignService} from "./services/campaign.service";
import {CampaignProvider} from "./providers/campaign.provider";
import {BudgetRepository} from "./repositories/budget.repository";
import {BudgetService} from "./services/budget.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                BudgetEntity,
                CampaignEntity,

                BudgetRepository,
                CampaignRepository,
            ]
        ),
        GuardModule,
        forwardRef(() => ConfigModule),
        SharedModule,
    ],
    controllers: [CampaignController],
    providers: [
        CampaignService,
        BudgetService,

        CampaignProvider,
    ],
    exports: [
        CampaignService,
        BudgetService,
        CampaignProvider,
    ],
})
export class MarketModule {
}
