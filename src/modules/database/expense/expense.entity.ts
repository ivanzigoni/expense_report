import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('expenses')
export class ExpenseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'description' })
  description: string;

  @ApiProperty()
  @Column({ name: 'expense_date' })
  expenseDate: Date;

  // in cents to avoid float
  @ApiProperty()
  @Column({ name: 'expense_value' })
  expenseValue: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.expenses)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'expenses_user_id_fkey',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}
