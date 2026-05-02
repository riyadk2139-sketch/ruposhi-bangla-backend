import { CollabGroup } from './collab-group.entity';
import { User } from './user.entity';
export declare class CollabMember {
    id: string;
    groupId: string;
    group: CollabGroup;
    userId: string;
    user: User;
    role: string;
    joinedAt: Date;
}
