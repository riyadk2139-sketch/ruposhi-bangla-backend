import { CollabGroup } from './collab-group.entity';
export declare class CollabExpense {
    id: string;
    groupId: string;
    group: CollabGroup;
    paidById: string;
    label: string;
    amount: number;
    category: string;
    splitWith: string[];
    date: string;
    createdAt: Date;
}
