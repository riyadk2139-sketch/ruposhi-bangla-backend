import { Repository } from 'typeorm';
import { Trip } from '../../entities/trip.entity';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto';
export declare class TripsService {
    private repo;
    constructor(repo: Repository<Trip>);
    create(userId: string, dto: CreateTripDto): Promise<Trip>;
    findAll(userId: string): Promise<Trip[]>;
    findOne(id: string, userId: string): Promise<Trip>;
    update(id: string, userId: string, dto: UpdateTripDto): Promise<Trip>;
    remove(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
}
