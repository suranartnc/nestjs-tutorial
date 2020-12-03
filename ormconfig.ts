import * as dotenv from 'dotenv';

if (!(<any>module).hot /* for webpack HMR */) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
};
