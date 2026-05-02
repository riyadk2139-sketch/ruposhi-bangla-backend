import { BudgetService } from './budget.service';
import { CreateExpenseDto } from './dto/expense.dto';
export declare class BudgetController {
    private budgetService;
    constructor(budgetService: BudgetService);
    add(req: any, tripId: string, dto: CreateExpenseDto): Promise<import("../../entities/expense.entity").Expense>;
    list(req: any, tripId: string): Promise<import("../../entities/expense.entity").Expense[]>;
    summary(req: any, tripId: string): Promise<{
        expenses: import("../../entities/expense.entity").Expense[];
        byCategory: Record<string, {
            estimated: number;
            actual: number;
        }>;
        totalActual: number;
    }>;
    remove(req: any, id: string): Promise<{
        deleted: boolean;
    }>;
}
