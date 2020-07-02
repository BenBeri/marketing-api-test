import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '770770',
  database: 'assuta',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: ['src/database/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migration',
  },
};

export = config;
