import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  last_name: string;

  @Column({ name: "email" })
  email: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}