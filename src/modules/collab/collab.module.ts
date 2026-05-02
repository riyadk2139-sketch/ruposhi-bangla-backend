import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollabGroup } from '../../entities/collab-group.entity';
import { CollabMember } from '../../entities/collab-member.entity';
import { CollabExpense } from '../../entities/collab-expense.entity';
import { CollabPoll } from '../../entities/collab-poll.entity';
import { CollabService } from './collab.service';
import { CollabController } from './collab.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CollabGroup, CollabMember, CollabExpense, CollabPoll])],
  providers: [CollabService],
  controllers: [CollabController],
})
export class CollabModule {}
