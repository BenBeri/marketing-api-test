import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TypeOrmSQLConfigService implements TypeOrmOptionsFactory {
  protected TAG: string = `${this.constructor.name}`;
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'postgres',
      type: 'postgres',
      synchronize: true,
      logging: true,
      host: this.configService.host,
      port: this.configService.port,
      username: this.configService.username,
      password: this.configService.password,
      database: this.configService.database,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}
