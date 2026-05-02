import { CollabService } from './collab.service';
import { CreateCollabGroupDto, JoinGroupDto, CreateCollabExpenseDto, CreatePollDto, VoteDto } from './dto/collab.dto';
export declare class CollabController {
    private collabService;
    constructor(collabService: CollabService);
    create(req: any, dto: CreateCollabGroupDto): Promise<{
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
        sharedExpenses: import("../../entities/collab-expense.entity").CollabExpense[];
        polls: import("../../entities/collab-poll.entity").CollabPoll[];
        createdAt: Date;
    }>;
    findAll(req: any): Promise<{
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
        sharedExpenses: import("../../entities/collab-expense.entity").CollabExpense[];
        polls: import("../../entities/collab-poll.entity").CollabPoll[];
        createdAt: Date;
    }[]>;
    findOne(req: any, id: string): Promise<{
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
        sharedExpenses: import("../../entities/collab-expense.entity").CollabExpense[];
        polls: import("../../entities/collab-poll.entity").CollabPoll[];
        createdAt: Date;
    }>;
    join(req: any, dto: JoinGroupDto): Promise<{
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
        sharedExpenses: import("../../entities/collab-expense.entity").CollabExpense[];
        polls: import("../../entities/collab-poll.entity").CollabPoll[];
        createdAt: Date;
    }>;
    addExpense(req: any, id: string, dto: CreateCollabExpenseDto): Promise<import("../../entities/collab-expense.entity").CollabExpense>;
    createPoll(req: any, id: string, dto: CreatePollDto): Promise<import("../../entities/collab-poll.entity").CollabPoll>;
    vote(req: any, id: string, pollId: string, dto: VoteDto): Promise<import("../../entities/collab-poll.entity").CollabPoll>;
}
