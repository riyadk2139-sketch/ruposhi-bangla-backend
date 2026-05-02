import { TripsService } from './trips.service';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto';
export declare class TripsController {
    private tripsService;
    constructor(tripsService: TripsService);
    create(req: any, dto: CreateTripDto): Promise<import("../../entities/trip.entity").Trip>;
    findAll(req: any): Promise<import("../../entities/trip.entity").Trip[]>;
    findOne(req: any, id: string): Promise<import("../../entities/trip.entity").Trip>;
    update(req: any, id: string, dto: UpdateTripDto): Promise<import("../../entities/trip.entity").Trip>;
    remove(req: any, id: string): Promise<{
        deleted: boolean;
    }>;
}
