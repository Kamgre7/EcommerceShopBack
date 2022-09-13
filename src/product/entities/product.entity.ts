import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInterface } from '../../types';

@Entity()
export class ProductEntity extends BaseEntity implements ProductInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 25,
    unique: true,
  })
  name: string;

  @Column({
    length: 1500,
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
    length: 25,
  })
  sku: string;

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
    length: 25,
  })
  category: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;
}
