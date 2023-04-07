import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity("expenses")
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

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  @JoinColumn({ name: "user_id", foreignKeyConstraintName: "expenses_user_id_fkey", referencedColumnName: "id" })
  user: UserEntity
}