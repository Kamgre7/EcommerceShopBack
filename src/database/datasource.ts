import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    'dist/**/**/**/**.entity{.ts,.js}',
    'dist/**/**/**.entity{.ts,.js}',
    'dist/**/**.entity{.ts,.js}',
  ],
  bigNumberStrings: false,
  //logging: true,
  migrations: ['dist/database/migrations/*.js'],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    decimalNumbers: true,
  },
  cli: {
    migrationsDir: 'migrations',
  },
} as DataSourceOptions);
