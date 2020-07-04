import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CronSchedulersModule } from '../schedulers/cron-schedulers.module';
import { DataUpdateCheckGuard } from './data-update-check.guard';

@Module({
  imports: [
    ConfigModule,
    CronSchedulersModule,
  ],
  providers: [DataUpdateCheckGuard],
  exports: [DataUpdateCheckGuard],
})
export class GuardModule {
}
