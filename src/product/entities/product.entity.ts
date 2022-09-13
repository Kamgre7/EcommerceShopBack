import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductInterface } from '../../types';
import { ProductCategoryEntity } from '../../category/entities/category.entity';
import { ProductInventoryEntity } from './product-inventory.entity';

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
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @ManyToOne((type) => ProductCategoryEntity, (entity) => entity.productList)
  @JoinColumn()
  category: ProductCategoryEntity;

  @OneToOne((type) => ProductInventoryEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  quantity: ProductInventoryEntity;
}
