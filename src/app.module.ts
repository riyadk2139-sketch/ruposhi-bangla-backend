import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TripsModule } from './modules/trips/trips.module';
import { BudgetModule } from './modules/budget/budget.module';
import { SosModule } from './modules/sos/sos.module';
import { CollabModule } from './modules/collab/collab.module';
import { User } from './entities/user.entity';
import { Trip } from './entities/trip.entity';
import { Expense } from './entities/expense.entity';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { CollabGroup } from './entities/collab-group.entity';
import { CollabMember } from './entities/collab-member.entity';
import { CollabExpense } from './entities/collab-expense.entity';
import { CollabPoll } from './entities/collab-poll.entity';

const ENTITIES = [
  User, Trip, Expense, EmergencyContact,
  CollabGroup, CollabMember, CollabExpense, CollabPoll,
];

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const isProd = cfg.get<string>('NODE_ENV') === 'production';

        if (isProd) {
          return {
            type: 'postgres' as const,
            url: cfg.get<string>('DATABASE_URL'),
            entities: ENTITIES,
            synchronize: false,
            migrationsRun: cfg.get<string>('RUN_MIGRATIONS') === 'true',
            migrations: ['dist/migrations/*.js'],
            ssl: cfg.get<string>('DB_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
          };
        }

        // Development — SQLite, auto-sync
        return {
          type: 'better-sqlite3' as const,
          database: cfg.get<string>('DB_PATH') || 'ruposhi.sqlite',
          entities: ENTITIES,
          synchronize: true,
        };
      },
    }),

    AuthModule,
    UsersModule,
    TripsModule,
    BudgetModule,
    SosModule,
    CollabModule,
  ],
})
export class AppModule {}
