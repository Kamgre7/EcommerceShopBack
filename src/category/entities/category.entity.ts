import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategoryInterface } from '../../types';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity()
export class ProductCategoryEntity
  extends BaseEntity
  implements ProductCategoryInterface
{
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

  @OneToMany((type) => ProductEntity, (entity) => entity.category)
  productList: ProductEntity[];
}
