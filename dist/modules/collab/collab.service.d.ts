import { Repository } from 'typeorm';
import { CollabGroup } from '../../entities/collab-group.entity';
import { CollabMember } from '../../entities/collab-member.entity';
import { CollabExpense } from '../../entities/collab-expense.entity';
import { CollabPoll } from '../../entities/collab-poll.entity';
import { CreateCollabGroupDto, JoinGroupDto, CreateCollabExpenseDto, CreatePollDto, VoteDto } from './dto/collab.dto';
export declare class CollabService {
    private groupRepo;
    private memberRepo;
    private expenseRepo;
    private pollRepo;
    constructor(groupRepo: Repository<CollabGroup>, memberRepo: Repository<CollabMember>, expenseRepo: Repository<CollabExpense>, pollRepo: Repository<CollabPoll>);
    create(userId: string, dto: CreateCollabGroupDto): Promise<{
        id: string;
        title: string;
        inviteCode: string;
        createdById: string;
        members: {
            id: string;
            userId: string;
            name: string;
            role: string;
        }[];
        sharedExpenses: CollabExpense[];
        polls: CollabPoll[];
        createdAt: Date;
    }>;
    findAllForUser(userId: string): Promise<{
        id: string;
        title: string;
        inviteCode: string;
        createdById: string;
        members: {
            id: string;
            userId: string;
            name: string;
            role: string;
        }[];
        sharedExpenses: CollabExpense[];
        polls: CollabPoll[];
        createdAt: Date;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        title: string;
        inviteCode: string;
        createdById: string;
        members: {
            id: string;
            userId: string;
            name: string;
            role: string;
        }[];
        sharedExpenses: CollabExpense[];
        polls: CollabPoll[];
        createdAt: Date;
    }>;
    join(userId: string, dto: JoinGroupDto): Promise<{
        id: string;
        title: string;
        inviteCode: string;
        createdById: string;
        members: {
            id: string;
            userId: string;
            name: string;
            role: string;
        }[];
        sharedExpenses: CollabExpense[];
        polls: CollabPoll[];
        createdAt: Date;
    }>;
    addExpense(groupId: string, userId: string, dto: CreateCollabExpenseDto): Promise<CollabExpense>;
    createPoll(groupId: string, userId: string, dto: CreatePollDto): Promise<CollabPoll>;
    vote(groupId: string, pollId: string, userId: string, dto: VoteDto): Promise<CollabPoll>;
    private assertMember;
    private serialize;
}
