import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {MyEntity} from '../decorator/database';

@Entity()
@MyEntity
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  role: string;
}