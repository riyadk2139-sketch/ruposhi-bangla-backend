"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trip_entity_1 = require("../../entities/trip.entity");
let TripsService = class TripsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(userId, dto) {
        const trip = this.repo.create({ ...dto, ownerId: userId });
        return this.repo.save(trip);
    }
    findAll(userId) {
        return this.repo.find({
            where: { ownerId: userId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const trip = await this.repo.findOne({ where: { id }, relations: ['expenses'] });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        if (trip.ownerId !== userId)
            throw new common_1.ForbiddenException();
        return trip;
    }
    async update(id, userId, dto) {
        const trip = await this.findOne(id, userId);
        Object.assign(trip, dto);
        return this.repo.save(trip);
    }
    async remove(id, userId) {
        const trip = await this.findOne(id, userId);
        await this.repo.remove(trip);
        return { deleted: true };
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trip_entity_1.Trip)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TripsService);
//# sourceMappingURL=trips.service.js.map