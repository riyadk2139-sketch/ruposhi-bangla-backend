import {
  Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollabGroup } from '../../entities/collab-group.entity';
import { CollabMember } from '../../entities/collab-member.entity';
import { CollabExpense } from '../../entities/collab-expense.entity';
import { CollabPoll } from '../../entities/collab-poll.entity';
import {
  CreateCollabGroupDto, JoinGroupDto,
  CreateCollabExpenseDto, CreatePollDto, VoteDto, UpdateItineraryDto,
} from './dto/collab.dto';

@Injectable()
export class CollabService {
  constructor(
    @InjectRepository(CollabGroup)  private groupRepo: Repository<CollabGroup>,
    @InjectRepository(CollabMember) private memberRepo: Repository<CollabMember>,
    @InjectRepository(CollabExpense) private expenseRepo: Repository<CollabExpense>,
    @InjectRepository(CollabPoll)   private pollRepo: Repository<CollabPoll>,
  ) {}

  async create(userId: string, dto: CreateCollabGroupDto) {
    const inviteCode = 'RB-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const group = this.groupRepo.create({ title: dto.title, inviteCode, createdById: userId });
    await this.groupRepo.save(group);
    const member = this.memberRepo.create({ groupId: group.id, userId, role: 'organiser' });
    await this.memberRepo.save(member);
    return this.findOne(group.id, userId);
  }

  async findAllForUser(userId: string) {
    const memberships = await this.memberRepo.find({ where: { userId } });
    return Promise.all(memberships.map((m) => this.findOne(m.groupId, userId)));
  }

  async findOne(id: string, userId: string) {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['members', 'members.user', 'expenses', 'polls'],
    });
    if (!group) throw new NotFoundException('Group not found');

    const isMember = group.members.some((m) => m.userId === userId);
    if (!isMember) throw new ForbiddenException();

    return this.serialize(group);
  }

  async join(userId: string, dto: JoinGroupDto) {
    const group = await this.groupRepo.findOne({ where: { inviteCode: dto.inviteCode } });
    if (!group) throw new NotFoundException('Invalid invite code');

    const existing = await this.memberRepo.findOne({ where: { groupId: group.id, userId } });
    if (existing) throw new ConflictException('Already a member of this group');

    const member = this.memberRepo.create({ groupId: group.id, userId, role: 'member' });
    await this.memberRepo.save(member);
    return this.findOne(group.id, userId);
  }

  async addExpense(groupId: string, userId: string, dto: CreateCollabExpenseDto) {
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

  async createPoll(groupId: string, userId: string, dto: CreatePollDto) {
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

  async vote(groupId: string, pollId: string, userId: string, dto: VoteDto) {
    await this.assertMember(groupId, userId);
    const poll = await this.pollRepo.findOne({ where: { id: pollId, groupId } });
    if (!poll) throw new NotFoundException();
    if (!poll.options.includes(dto.option)) throw new BadRequestException('Invalid option');
    poll.votes = { ...poll.votes, [userId]: dto.option };
    return this.pollRepo.save(poll);
  }

  private async assertMember(groupId: string, userId: string) {
    const m = await this.memberRepo.findOne({ where: { groupId, userId } });
    if (!m) throw new ForbiddenException('Not a member of this group');
  }

  async updateItinerary(groupId: string, userId: string, dto: UpdateItineraryDto) {
    await this.assertMember(groupId, userId);
    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    if (!group) throw new NotFoundException('Group not found');
    group.itinerary = dto.stops;
    await this.groupRepo.save(group);
    return this.findOne(groupId, userId);
  }

  private serialize(group: CollabGroup) {
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
      itinerary: group.itinerary ?? [],
      createdAt: group.createdAt,
    };
  }
}
