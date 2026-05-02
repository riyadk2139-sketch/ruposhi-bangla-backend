import { Trip } from './trip.entity';
export declare class Expense {
    id: string;
    label: string;
    category: string;
    amount: number;
    type: string;
    date: string;
    createdAt: Date;
    trip: Trip;
    tripId: string;
}
