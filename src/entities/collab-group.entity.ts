import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CollabMember } from './collab-member.entity';
import { CollabExpense } from './collab-expense.entity';
import { CollabPoll } from './collab-poll.entity';

@Entity('collab_groups')
export class CollabGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  inviteCode: string;

  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @OneToMany(() => CollabMember, (m) => m.group, { cascade: true })
  members: CollabMember[];

  @OneToMany(() => CollabExpense, (e) => e.group, { cascade: true })
  expenses: CollabExpense[];

  @OneToMany(() => CollabPoll, (p) => p.group, { cascade: true })
  polls: CollabPoll[];

  @CreateDateColumn()
  createdAt: Date;
}
