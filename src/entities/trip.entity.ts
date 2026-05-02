import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Expense } from './expense.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  destination: string;

  @Column({ default: '' })
  division: string;

  @Column({ default: 'upcoming' })
  status: string;  // upcoming | active | completed

  @Column({ default: 'backpacker' })
  travelStyle: string;

  @Column({ type: 'int', default: 1 })
  days: number;

  @Column({ nullable: true })
  dateFrom: string;

  @Column({ nullable: true })
  dateTo: string;

  @Column({ type: 'int', default: 0 })
  estimatedBudget: number;

  @Column({ type: 'int', default: 0 })
  actualBudget: number;

  @Column({ type: 'simple-json', nullable: true })
  itinerary: any;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.trips, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  ownerId: string;

  @OneToMany(() => Expense, (exp) => exp.trip)
  expenses: Expense[];
}
