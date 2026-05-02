import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../../entities/expense.entity';
import { Trip } from '../../entities/trip.entity';
import { CreateExpenseDto } from './dto/expense.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Expense) private expRepo: Repository<Expense>,
    @InjectRepository(Trip) private tripRepo: Repository<Trip>,
  ) {}

  private async assertOwner(tripId: string, userId: string) {
    const trip = await this.tripRepo.findOne({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.ownerId !== userId) throw new ForbiddenException();
    return trip;
  }

  async addExpense(tripId: string, userId: string, dto: CreateExpenseDto) {
    await this.assertOwner(tripId, userId);
    const exp = this.expRepo.create({ ...dto, tripId });
    const saved = await this.expRepo.save(exp);

    // keep actualBudget in sync on the trip
    const total = await this.expRepo
      .createQueryBuilder('e')
      .select('SUM(e.amount)', 'sum')
      .where('e.tripId = :tripId AND e.type = :type', { tripId, type: 'actual' })
      .getRawOne();
    await this.tripRepo.update(tripId, { actualBudget: Number(total?.sum || 0) });

    return saved;
  }

  async getExpenses(tripId: string, userId: string) {
    await this.assertOwner(tripId, userId);
    return this.expRepo.find({ where: { tripId }, order: { createdAt: 'DESC' } });
  }

  async deleteExpense(expId: string, userId: string) {
    const exp = await this.expRepo.findOne({ where: { id: expId }, relations: ['trip'] });
    if (!exp) throw new NotFoundException();
    if (exp.trip.ownerId !== userId) throw new ForbiddenException();
    await this.expRepo.remove(exp);
    return { deleted: true };
  }

  async getSummary(tripId: string, userId: string) {
    await this.assertOwner(tripId, userId);
    const expenses = await this.expRepo.find({ where: { tripId } });

    const byCategory = expenses.reduce((acc, e) => {
      if (!acc[e.category]) acc[e.category] = { estimated: 0, actual: 0 };
      acc[e.category][e.type === 'estimated' ? 'estimated' : 'actual'] += e.amount;
      return acc;
    }, {} as Record<string, { estimated: number; actual: number }>);

    const totalActual = expenses.filter((e) => e.type !== 'estimated').reduce((s, e) => s + e.amount, 0);

    return { expenses, byCategory, totalActual };
  }
}
