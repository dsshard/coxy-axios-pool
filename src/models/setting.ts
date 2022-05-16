import { Entity, Column, Index, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'settings' })
export class Setting extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  @Index()
  key: string;

  @Column()
  value: any;
}
