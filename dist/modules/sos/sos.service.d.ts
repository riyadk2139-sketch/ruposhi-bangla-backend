import { Repository } from 'typeorm';
import { EmergencyContact } from '../../entities/emergency-contact.entity';
export declare class SosService {
    private repo;
    constructor(repo: Repository<EmergencyContact>);
    getContacts(userId: string): Promise<EmergencyContact[]>;
    addContact(userId: string, data: {
        name: string;
        phone: string;
        relation?: string;
    }): Promise<EmergencyContact>;
    removeContact(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
}
