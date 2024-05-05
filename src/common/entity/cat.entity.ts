import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("cats")
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
