import { Trip } from './trip.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    createdAt: Date;
    trips: Trip[];
}
