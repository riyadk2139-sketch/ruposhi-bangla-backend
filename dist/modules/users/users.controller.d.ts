import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): any;
    updateMe(req: any, body: {
        name?: string;
        phone?: string;
    }): Promise<import("../../entities/user.entity").User | null>;
}
