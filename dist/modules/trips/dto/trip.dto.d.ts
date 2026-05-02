export declare class CreateTripDto {
    title: string;
    destination: string;
    division?: string;
    travelStyle?: string;
    days?: number;
    dateFrom?: string;
    dateTo?: string;
    estimatedBudget?: number;
}
export declare class UpdateTripDto {
    title?: string;
    status?: string;
    actualBudget?: number;
    itinerary?: any;
}
