import { User } from './user.entity';
import { CollabMember } from './collab-member.entity';
import { CollabExpense } from './collab-expense.entity';
import { CollabPoll } from './collab-poll.entity';
export declare class CollabGroup {
    id: string;
    title: string;
    inviteCode: string;
    createdById: string;
    createdBy: User;
    members: CollabMember[];
    expenses: CollabExpense[];
    polls: CollabPoll[];
    createdAt: Date;
}
