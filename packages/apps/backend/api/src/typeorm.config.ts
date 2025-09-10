import 'reflect-metadata';
import 'tsconfig-paths/register';
import { DataSource } from 'typeorm';
import { UserEntity } from './app/users/entities/user.entity';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../.env') });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity],
  //entities: ['apps/backend/api/src/**/*.entity.ts'],
  //migrations: ['apps/backend/api/src/migrations/*.ts'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});

export default AppDataSource;