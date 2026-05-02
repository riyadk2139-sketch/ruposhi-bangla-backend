import { CollabGroup } from './collab-group.entity';
export declare class CollabPoll {
    id: string;
    groupId: string;
    group: CollabGroup;
    question: string;
    options: string[];
    votes: Record<string, string>;
    createdById: string;
    createdAt: Date;
}
