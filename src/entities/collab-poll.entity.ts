import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { CollabGroup } from './collab-group.entity';

@Entity('collab_polls')
export class CollabPoll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  groupId: string;

  @ManyToOne(() => CollabGroup, (g) => g.polls, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: CollabGroup;

  @Column()
  question: string;

  @Column({ type: 'simple-json' })
  options: string[];

  @Column({ type: 'simple-json', default: '{}' })
  votes: Record<string, string>;

  @Column()
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;
}
