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
exports.BudgetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("../../entities/expense.entity");
const trip_entity_1 = require("../../entities/trip.entity");
let BudgetService = class BudgetService {
    expRepo;
    tripRepo;
    constructor(expRepo, tripRepo) {
        this.expRepo = expRepo;
        this.tripRepo = tripRepo;
    }
    async assertOwner(tripId, userId) {
        const trip = await this.tripRepo.findOne({ where: { id: tripId } });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        if (trip.ownerId !== userId)
            throw new common_1.ForbiddenException();
        return trip;
    }
    async addExpense(tripId, userId, dto) {
        await this.assertOwner(tripId, userId);
        const exp = this.expRepo.create({ ...dto, tripId });
        const saved = await this.expRepo.save(exp);
        const total = await this.expRepo
            .createQueryBuilder('e')
            .select('SUM(e.amount)', 'sum')
            .where('e.tripId = :tripId AND e.type = :type', { tripId, type: 'actual' })
            .getRawOne();
        await this.tripRepo.update(tripId, { actualBudget: Number(total?.sum || 0) });
        return saved;
    }
    async getExpenses(tripId, userId) {
        await this.assertOwner(tripId, userId);
        return this.expRepo.find({ where: { tripId }, order: { createdAt: 'DESC' } });
    }
    async deleteExpense(expId, userId) {
        const exp = await this.expRepo.findOne({ where: { id: expId }, relations: ['trip'] });
        if (!exp)
            throw new common_1.NotFoundException();
        if (exp.trip.ownerId !== userId)
            throw new common_1.ForbiddenException();
        await this.expRepo.remove(exp);
        return { deleted: true };
    }
    async getSummary(tripId, userId) {
        await this.assertOwner(tripId, userId);
        const expenses = await this.expRepo.find({ where: { tripId } });
        const byCategory = expenses.reduce((acc, e) => {
            if (!acc[e.category])
                acc[e.category] = { estimated: 0, actual: 0 };
            acc[e.category][e.type === 'estimated' ? 'estimated' : 'actual'] += e.amount;
            return acc;
        }, {});
        const totalActual = expenses.filter((e) => e.type !== 'estimated').reduce((s, e) => s + e.amount, 0);
        return { expenses, byCategory, totalActual };
    }
};
exports.BudgetService = BudgetService;
exports.BudgetService = BudgetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __param(1, (0, typeorm_1.InjectRepository)(trip_entity_1.Trip)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BudgetService);
//# sourceMappingURL=budget.service.js.map