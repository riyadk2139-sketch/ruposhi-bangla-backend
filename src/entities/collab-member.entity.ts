import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { CollabGroup } from './collab-group.entity';
import { User } from './user.entity';

@Entity('collab_members')
export class CollabMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  groupId: string;

  @ManyToOne(() => CollabGroup, (g) => g.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: CollabGroup;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: 'member' })
  role: string;

  @CreateDateColumn()
  joinedAt: Date;
}
