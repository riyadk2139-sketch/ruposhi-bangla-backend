import { Repository } from 'typeorm';
import { Expense } from '../../entities/expense.entity';
import { Trip } from '../../entities/trip.entity';
import { CreateExpenseDto } from './dto/expense.dto';
export declare class BudgetService {
    private expRepo;
    private tripRepo;
    constructor(expRepo: Repository<Expense>, tripRepo: Repository<Trip>);
    private assertOwner;
    addExpense(tripId: string, userId: string, dto: CreateExpenseDto): Promise<Expense>;
    getExpenses(tripId: string, userId: string): Promise<Expense[]>;
    deleteExpense(expId: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    getSummary(tripId: string, userId: string): Promise<{
        expenses: Expense[];
        byCategory: Record<string, {
            estimated: number;
            actual: number;
        }>;
        totalActual: number;
    }>;
}
