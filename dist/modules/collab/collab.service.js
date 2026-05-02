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
exports.CollabService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collab_group_entity_1 = require("../../entities/collab-group.entity");
const collab_member_entity_1 = require("../../entities/collab-member.entity");
const collab_expense_entity_1 = require("../../entities/collab-expense.entity");
const collab_poll_entity_1 = require("../../entities/collab-poll.entity");
let CollabService = class CollabService {
    groupRepo;
    memberRepo;
    expenseRepo;
    pollRepo;
    constructor(groupRepo, memberRepo, expenseRepo, pollRepo) {
        this.groupRepo = groupRepo;
        this.memberRepo = memberRepo;
        this.expenseRepo = expenseRepo;
        this.pollRepo = pollRepo;
    }
    async create(userId, dto) {
        const inviteCode = 'RB-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        const group = this.groupRepo.create({ title: dto.title, inviteCode, createdById: userId });
        await this.groupRepo.save(group);
        const member = this.memberRepo.create({ groupId: group.id, userId, role: 'organiser' });
        await this.memberRepo.save(member);
        return this.findOne(group.id, userId);
    }
    async findAllForUser(userId) {
        const memberships = await this.memberRepo.find({ where: { userId } });
        return Promise.all(memberships.map((m) => this.findOne(m.groupId, userId)));
    }
    async findOne(id, userId) {
        const group = await this.groupRepo.findOne({
            where: { id },
            relations: ['members', 'members.user', 'expenses', 'polls'],
        });
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        const isMember = group.members.some((m) => m.userId === userId);
        if (!isMember)
            throw new common_1.ForbiddenException();
        return this.serialize(group);
    }
    async join(userId, dto) {
        const group = await this.groupRepo.findOne({ where: { inviteCode: dto.inviteCode } });
        if (!group)
            throw new common_1.NotFoundException('Invalid invite code');
        const existing = await this.memberRepo.findOne({ where: { groupId: group.id, userId } });
        if (existing)
            throw new common_1.ConflictException('Already a member of this group');
        const member = this.memberRepo.create({ groupId: group.id, userId, role: 'member' });
        await this.memberRepo.save(member);
        return this.findOne(group.id, userId);
    }
    async addExpense(groupId, userId, dto) {
        await this.assertMember(groupId, userId);
        const allMembers = await this.memberRepo.find({ where: { groupId } });
        const splitWith = dto.splitWith?.length ? dto.splitWith : allMembers.map((m) => m.userId);
        const expense = this.expenseRepo.create({
            groupId,
            paidById: userId,
            label: dto.label,
            amount: dto.amount,
            category: dto.category,
            splitWith,
            date: dto.date || new Date().toISOString().split('T')[0],
        });
        return this.expenseRepo.save(expense);
    }
    async createPoll(groupId, userId, dto) {
        await this.assertMember(groupId, userId);
        const poll = this.pollRepo.create({
            groupId,
            question: dto.question,
            options: dto.options,
            votes: {},
            createdById: userId,
        });
        return this.pollRepo.save(poll);
    }
    async vote(groupId, pollId, userId, dto) {
        await this.assertMember(groupId, userId);
        const poll = await this.pollRepo.findOne({ where: { id: pollId, groupId } });
        if (!poll)
            throw new common_1.NotFoundException();
        if (!poll.options.includes(dto.option))
            throw new common_1.BadRequestException('Invalid option');
        poll.votes = { ...poll.votes, [userId]: dto.option };
        return this.pollRepo.save(poll);
    }
    async assertMember(groupId, userId) {
        const m = await this.memberRepo.findOne({ where: { groupId, userId } });
        if (!m)
            throw new common_1.ForbiddenException('Not a member of this group');
    }
    serialize(group) {
        return {
            id: group.id,
            title: group.title,
            inviteCode: group.inviteCode,
            createdById: group.createdById,
            members: group.members.map((m) => ({
                id: m.id,
                userId: m.userId,
                name: m.user?.name || 'Unknown',
                role: m.role,
            })),
            sharedExpenses: group.expenses ?? [],
            polls: group.polls ?? [],
            createdAt: group.createdAt,
        };
    }
};
exports.CollabService = CollabService;
exports.CollabService = CollabService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collab_group_entity_1.CollabGroup)),
    __param(1, (0, typeorm_1.InjectRepository)(collab_member_entity_1.CollabMember)),
    __param(2, (0, typeorm_1.InjectRepository)(collab_expense_entity_1.CollabExpense)),
    __param(3, (0, typeorm_1.InjectRepository)(collab_poll_entity_1.CollabPoll)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CollabService);
//# sourceMappingURL=collab.service.js.map