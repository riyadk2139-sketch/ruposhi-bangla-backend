import { SosService } from './sos.service';
export declare class SosController {
    private sosService;
    constructor(sosService: SosService);
    list(req: any): Promise<import("../../entities/emergency-contact.entity").EmergencyContact[]>;
    add(req: any, body: {
        name: string;
        phone: string;
        relation?: string;
    }): Promise<import("../../entities/emergency-contact.entity").EmergencyContact>;
    remove(req: any, id: string): Promise<{
        deleted: boolean;
    }>;
}
