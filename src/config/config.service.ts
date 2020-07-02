import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { AppLogger } from '../logger/logger';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  protected TAG: string = `${this.constructor.name}`;
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    try {
      let config;
      if (filePath === 'undefined.env') {
        config = dotenv.parse(fs.readFileSync('development.env'));
      } else {
        config = dotenv.parse(fs.readFileSync(filePath));
      }
      this.envConfig = this.validateInput(config);
    } catch (e) {
      AppLogger.log('Production mode', this.TAG);
    }
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      DB_HOST: Joi.string(),
      DB_PORT: Joi.number(),
      DB_USERNAME: Joi.string(),
      DB_PASSWORD: Joi.string(),
      DB_SCHEMA: Joi.string(),
      AMPLIFY_API_MARKETER_ID: Joi.string(),
      AMPLIFY_API_ACCESS_TOKEN: Joi.string(),
      PORT: Joi.number(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get host(): string {
    return String(process.env.DB_HOST || this.envConfig.DB_HOST);
  }

  get port(): number {
    return Number(process.env.DB_PORT || this.envConfig.DB_PORT);
  }

  get username(): string {
    return String(process.env.DB_USERNAME || this.envConfig.DB_USERNAME);
  }

  get password(): string {
    return String(process.env.DB_PASSWORD || this.envConfig.DB_PASSWORD);
  }

  get database(): string {
    return String( process.env.DB_SCHEMA || this.envConfig.DB_SCHEMA);
  }
}
