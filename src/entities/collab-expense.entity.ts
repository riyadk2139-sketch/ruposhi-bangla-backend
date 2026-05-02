import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { CollabGroup } from './collab-group.entity';

@Entity('collab_expenses')
export class CollabExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  groupId: string;

  @ManyToOne(() => CollabGroup, (g) => g.expenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: CollabGroup;

  @Column()
  paidById: string;

  @Column()
  label: string;

  @Column('float')
  amount: number;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'simple-json' })
  splitWith: string[];

  @Column({ nullable: true })
  date: string;

  @CreateDateColumn()
  createdAt: Date;
}
