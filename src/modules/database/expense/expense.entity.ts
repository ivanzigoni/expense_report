import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity()
export class ExpenseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @Column({ name: "description" })
  description: string;

  @Column({ name: "expense_date" })
  expenseDate: Date

  // in cents to avoid float
  @Column({ name: "expense_value" })
  expenseValue: number;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  user: UserEntity
}