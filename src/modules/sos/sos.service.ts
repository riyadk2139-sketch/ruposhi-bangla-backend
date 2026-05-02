import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContact } from '../../entities/emergency-contact.entity';

@Injectable()
export class SosService {
  constructor(
    @InjectRepository(EmergencyContact) private repo: Repository<EmergencyContact>,
  ) {}

  getContacts(userId: string) {
    return this.repo.find({ where: { userId } });
  }

  addContact(userId: string, data: { name: string; phone: string; relation?: string }) {
    const contact = this.repo.create({ ...data, userId });
    return this.repo.save(contact);
  }

  async removeContact(id: string, userId: string) {
    await this.repo.delete({ id, userId });
    return { deleted: true };
  }
}
