import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductInterface } from '../../types';
import { ProductCategoryEntity } from '../../category/entities/category.entity';
import { ProductInventoryEntity } from './product-inventory.entity';
import { BasketEntity } from '../../basket/entities/basket.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  productApiInformation,
  productApiMessage,
} from '../../utils/api-messages';

@Entity()
export class ProductEntity extends BaseEntity implements ProductInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: productApiInformation.productId,
  })
  id: string;

  @Column({
    length: 25,
    unique: true,
  })
  @ApiProperty({
    type: String,
    example: productApiInformation.name,
  })
  name: string;

  @Column({
    length: 1500,
    default: '',
  })
  @ApiProperty({
    type: String,
    example: productApiInformation.description,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 8,
    scale: 2,
  })
  @ApiProperty({
    type: Number,
    example: productApiInformation.price,
  })
  price: number;

  @Column({
    length: 25,
  })
  @ApiProperty({
    type: String,
    example: productApiInformation.sku,
  })
  sku: string;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
  })
  @ApiProperty({
    type: Number,
    example: productApiInformation.boughtCounter,
  })
  boughtCounter: number;

  @Column({
    default: null,
    nullable: true,
  })
  @ApiProperty({
    type: String,
    example: productApiInformation.photoFileName,
  })
  photoFileName: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: productApiMessage.createdDate,
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: productApiMessage.updatedDate,
  })
  modifiedAt: Date;

  @ManyToOne(() => ProductCategoryEntity, (entity) => entity.productList)
  @JoinColumn()
  category: ProductCategoryEntity;

  @OneToOne(() => ProductInventoryEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  productInventory: ProductInventoryEntity;

  @OneToMany(() => BasketEntity, (entity) => entity.product)
  itemsInBasket: BasketEntity[];
}
