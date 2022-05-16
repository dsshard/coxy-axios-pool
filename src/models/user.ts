import {
  Entity,
  Column,
  Index,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'users' })
export class Admin extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  @Index()
  login: string;

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
