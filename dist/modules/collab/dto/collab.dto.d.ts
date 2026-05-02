export declare class CreateCollabGroupDto {
    title: string;
}
export declare class JoinGroupDto {
    inviteCode: string;
}
export declare class CreateCollabExpenseDto {
    label: string;
    amount: number;
    category?: string;
    splitWith?: string[];
    date?: string;
}
export declare class CreatePollDto {
    question: string;
    options: string[];
}
export declare class VoteDto {
    option: string;
}
