import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  category: string;  // transport | accommodation | food | entry | misc

  @Column({ type: 'int' })
  amount: number;

  @Column({ default: 'actual' })
  type: string;  // estimated | actual

  @Column({ nullable: true })
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Trip, (trip) => trip.expenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tripId' })
  trip: Trip;

  @Column()
  tripId: string;
}
