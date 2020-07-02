import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CampaignController} from './controllers/campaign.controller';
import {GuardModule} from '../../guards/guard.module';
import {ConfigModule} from '../../config/config.module';
import {BudgetEntity} from "./models/domain/budget.entity";
import {CampaignEntity} from "./models/domain/campaign.entity";
import {SharedModule} from "../shared/shared.module";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                BudgetEntity,
                CampaignEntity,
            ]
        ),
        GuardModule,
        forwardRef(() => ConfigModule),
        SharedModule,
    ],
    controllers: [CampaignController],
    providers: [],
    exports: [],
})
export class MarketModule {
}
