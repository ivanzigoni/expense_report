import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { ExpenseEntity } from '../expense/expense.entity';
import { ApiProperty } from '@nestjs/swagger';

config();

const configService = new ConfigService();

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'first_name' })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty()
  @Column({ name: 'email', unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @ApiProperty({ type: () => Array<ExpenseEntity> })
  @OneToMany(() => ExpenseEntity, (expense) => expense.user)
  expenses: ExpenseEntity[];

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(+configService.get('SALT'));
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
