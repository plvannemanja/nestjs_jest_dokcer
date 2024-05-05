import { UserRole } from "../types/user-role.enum";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    array: true,
  })
  roles: UserRole[];
}
