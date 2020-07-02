import { Module } from '@nestjs/common';
import { TypeOrmSQLConfigService } from './type-orm-SQL-config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [TypeOrmSQLConfigService],
  exports: [TypeOrmSQLConfigService],
})
export class DatabaseModule {}
