import { User } from './user.entity';
import { Expense } from './expense.entity';
export declare class Trip {
    id: string;
    title: string;
    destination: string;
    division: string;
    status: string;
    travelStyle: string;
    days: number;
    dateFrom: string;
    dateTo: string;
    estimatedBudget: number;
    actualBudget: number;
    itinerary: any;
    createdAt: Date;
    owner: User;
    ownerId: string;
    expenses: Expense[];
}
