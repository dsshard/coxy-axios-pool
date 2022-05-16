import { Entity, Column, Index, BaseEntity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

enum Roles {
  ADMIN_ROLE = 'ADMIN_ROLE',
  MODERATOR_ROLE = 'MODERATOR_ROLE'
}

@Entity({ name: 'admins' })
export class Admin extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  @Index()
  login: string;

  @Column()
  password: string;

  @Column('enum', { enum: Roles })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
