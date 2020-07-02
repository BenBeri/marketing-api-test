import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../../logger/logger';
import { getConnectionManager } from 'typeorm';
import { HealthCheckError } from '@godaddy/terminus';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class AppHealthIndicator extends HealthIndicator{
  protected TAG: string = `${this.constructor.name}`;

  constructor() {
    super();
    AppLogger.log('Init', this.TAG);
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const connectionManager = await getConnectionManager().get('mysql');
      await connectionManager.query(`SELECT version()`);
      return this.getStatus(key, true);
    } catch (error) {
      AppLogger.error(error, this.TAG);
      throw new HealthCheckError(this.TAG +  ' Health failed', error);
    }
  }
}
