import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CampaignController} from './controllers/campaign.controller';
import {GuardModule} from '../../guards/guard.module';
import {ConfigModule} from '../../config/config.module';

@Module({
    imports: [TypeOrmModule.forFeature([]),
        GuardModule,
        ConfigModule],
    controllers: [CampaignController],
    providers: [],
    exports: [],
})
export class MarketModule {
}
