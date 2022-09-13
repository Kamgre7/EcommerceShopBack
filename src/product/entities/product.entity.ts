import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInterface } from '../../types';

@Entity()
export class Product extends BaseEntity implements ProductInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 25,
    unique: true,
  })
  name: string;

  @Column({
    length: 2500,
    default: '',
  })
  description: string;

  @Column({
    type: 'float',
    precision: 8,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  quantity: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
  })
  boughtCounter: number;

  @Column({
    default: null,
    nullable: true,
  })
  photoFileName: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;
}
