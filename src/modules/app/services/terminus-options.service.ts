import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  TerminusModuleOptions
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { AppHealthIndicator } from '../health/app.health';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(private readonly appHealthIndicator: AppHealthIndicator) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.appHealthIndicator.isHealthy('app'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
