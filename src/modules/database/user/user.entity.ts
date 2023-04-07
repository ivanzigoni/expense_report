import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
 
config();
 
const configService = new ConfigService();


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

  @Column({ name: "password" })
  password: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(+configService.get("SALT"))
    this.password = bcrypt.hashSync(this.password, salt);
  }
}