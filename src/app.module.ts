import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from './config/config.module';
import {DatabaseModule} from './database/database.module';
import {TypeOrmSQLConfigService} from './database/type-orm-SQL-config.service';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import {CacheInterceptor} from './interceptors/cache.interceptor';
import {TimeoutInterceptor} from './interceptors/timeout.interceptor';
import {AllExceptionsFilter} from './exceptions/http-exception.filter';
import {MarketModule} from './modules/market/market.module';
import {LoggerModule} from './logger/logger.module';
import {CronSchedulersModule} from "./schedulers/cron-schedulers.module";
import {ScheduleModule} from '@nestjs/schedule';
import {join} from "path";
import {ServeStaticModule} from '@nestjs/serve-static';


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        TypeOrmModule.forRootAsync({
            imports: [DatabaseModule],
            useExisting: TypeOrmSQLConfigService,
        }),
        ConfigModule,
        LoggerModule,
        forwardRef(() => MarketModule),
        CronSchedulersModule,
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
    ],
    exports: [],
})

export class AppModule {
}
