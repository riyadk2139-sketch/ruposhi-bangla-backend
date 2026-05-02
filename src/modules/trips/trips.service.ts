import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../../entities/trip.entity';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto';

@Injectable()
export class TripsService {
  constructor(@InjectRepository(Trip) private repo: Repository<Trip>) {}

  async create(userId: string, dto: CreateTripDto) {
    const trip = this.repo.create({ ...dto, ownerId: userId });
    return this.repo.save(trip);
  }

  findAll(userId: string) {
    return this.repo.find({
      where: { ownerId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const trip = await this.repo.findOne({ where: { id }, relations: ['expenses'] });
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.ownerId !== userId) throw new ForbiddenException();
    return trip;
  }

  async update(id: string, userId: string, dto: UpdateTripDto) {
    const trip = await this.findOne(id, userId);
    Object.assign(trip, dto);
    return this.repo.save(trip);
  }

  async remove(id: string, userId: string) {
    const trip = await this.findOne(id, userId);
    await this.repo.remove(trip);
    return { deleted: true };
  }
}
