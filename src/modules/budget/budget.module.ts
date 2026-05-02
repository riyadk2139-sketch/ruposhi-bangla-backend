import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../../entities/expense.entity';
import { Trip } from '../../entities/trip.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Trip])],
  providers: [BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {}
