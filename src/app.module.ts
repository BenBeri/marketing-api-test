import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from './config/config.module';
import {DatabaseModule} from './database/database.module';
import {TypeOrmSQLConfigService} from './database/type-orm-SQL-config.service';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import {CacheInterceptor} from './interceptors/cache.interceptor';
import {TimeoutInterceptor} from './interceptors/timeout.interceptor';
import {AllExceptionsFilter} from './exceptions/http-exception.filter';
import {AppHealthIndicator} from './modules/app/health/app.health';
import {TerminusOptionsService} from './modules/app/services/terminus-options.service';
import {TerminusModule} from '@nestjs/terminus';
import {MarketModule} from './modules/market/market.module';
import {LoggerModule} from './logger/logger.module';
import {ScheduleModule} from '@nestjs/schedule';
import {CampaignScheduler} from "./schedulers/campaign.scheduler";

@Module({
    imports: [
        TerminusModule.forRootAsync({
            imports: [AppModule],
            useClass: TerminusOptionsService,
        }),
        TypeOrmModule.forRootAsync({
            imports: [DatabaseModule],
            useExisting: TypeOrmSQLConfigService,
        }),
        ConfigModule,
        LoggerModule,
        MarketModule,
        ScheduleModule.forRoot(),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        }, {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        }, {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        AppHealthIndicator,
        CampaignScheduler,

    ],
    exports: [AppHealthIndicator],
})

export class AppModule {
}
