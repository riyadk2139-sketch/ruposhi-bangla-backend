import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

// Standalone datasource used by the TypeORM migrations CLI.
// Run: npm run migration:generate -- src/migrations/<Name>
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
